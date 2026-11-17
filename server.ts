import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';

interface RsvpRecord {
  id: string;
  fullName: string;
  phone: string;
  attending: 'yes' | 'no';
  guestCount: number;
  message: string;
  createdAt: string;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const RSVP_FILE = path.join(DATA_DIR, 'rsvps.json');

async function ensureStorage(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(RSVP_FILE);
  } catch {
    await fs.writeFile(RSVP_FILE, '[]', 'utf8');
  }
}

async function readRsvps(): Promise<RsvpRecord[]> {
  await ensureStorage();
  try {
    const raw = await fs.readFile(RSVP_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as RsvpRecord[]) : [];
  } catch {
    return [];
  }
}

async function writeRsvps(records: RsvpRecord[]): Promise<void> {
  await ensureStorage();
  await fs.writeFile(RSVP_FILE, JSON.stringify(records, null, 2), 'utf8');
}

async function startServer(): Promise<void> {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/rsvp/summary', async (_req, res) => {
    try {
      const records = await readRsvps();
      const confirmedResponses = records.filter((item) => item.attending === 'yes');
      const totalConfirmedGuests = confirmedResponses.reduce(
        (sum, item) => sum + Math.max(1, item.guestCount || 1),
        0,
      );
      const recentWishes = records
        .filter((item) => item.message.trim().length > 0)
        .slice(-6)
        .reverse()
        .map((item) => ({
          id: item.id,
          fullName: item.fullName,
          message: item.message,
          createdAt: item.createdAt,
        }));

      res.json({
        totalResponses: records.length,
        confirmedCount: confirmedResponses.length,
        totalConfirmedGuests,
        recentWishes,
      });
    } catch (error) {
      console.error('Erreur lecture RSVP:', error);
      res.status(500).json({ error: 'Impossible de charger les confirmations.' });
    }
  });

  app.post('/api/rsvp', async (req, res) => {
    try {
      const body = req.body as Record<string, unknown>;
      const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
      const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
      const attending = body.attending === 'no' ? 'no' : body.attending === 'yes' ? 'yes' : null;
      const rawGuestCount = Number(body.guestCount);
      const message = typeof body.message === 'string' ? body.message.trim().slice(0, 800) : '';

      if (fullName.length < 2 || fullName.length > 120) {
        res.status(400).json({ error: 'Veuillez renseigner votre nom et prénom.' });
        return;
      }

      if (phone.length < 6 || phone.length > 40) {
        res.status(400).json({ error: 'Veuillez indiquer un numéro de téléphone valide.' });
        return;
      }

      if (!attending) {
        res.status(400).json({ error: 'Veuillez préciser si vous serez présent(e).' });
        return;
      }

      const guestCount =
        attending === 'yes'
          ? Number.isFinite(rawGuestCount)
            ? Math.min(12, Math.max(1, Math.round(rawGuestCount)))
            : 1
          : 0;

      const record: RsvpRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        fullName,
        phone,
        attending,
        guestCount,
        message,
        createdAt: new Date().toISOString(),
      };

      const existing = await readRsvps();
      existing.push(record);
      await writeRsvps(existing);

      res.status(201).json({
        success: true,
        rsvp: {
          id: record.id,
          fullName: record.fullName,
          attending: record.attending,
          guestCount: record.guestCount,
          message: record.message,
          createdAt: record.createdAt,
        },
      });
    } catch (error) {
      console.error('Erreur enregistrement RSVP:', error);
      res.status(500).json({
        error: 'Une erreur est survenue lors de l’enregistrement. Veuillez réessayer.',
      });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur Clery & Loriane démarré sur le port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Échec du démarrage du serveur:', err);
  process.exit(1);
});
