import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, HeartHandshake, Send } from 'lucide-react';
import { OrnamentalDivider } from './BotanicalOrnament';

interface RsvpSummary {
  totalResponses: number;
  confirmedCount: number;
  totalConfirmedGuests: number;
  recentWishes: Array<{
    id: string;
    fullName: string;
    message: string;
    createdAt: string;
  }>;
}

export function RsvpSection() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<{
    fullName: string;
    attending: 'yes' | 'no';
    guestCount: number;
  } | null>(null);

  const [summary, setSummary] = useState<RsvpSummary | null>(null);

  const fetchSummary = async () => {
    try {
      const res = await fetch('/api/rsvp/summary');
      if (res.ok) {
        const data = (await res.json()) as RsvpSummary;
        setSummary(data);
      }
    } catch {
      // Silently ignore background wish summary fetch failures
    }
  };

  useEffect(() => {
    void fetchSummary();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (fullName.trim().length < 2) {
      setErrorMsg('Veuillez saisir votre nom et prénom.');
      return;
    }

    if (phone.trim().length < 6) {
      setErrorMsg('Veuillez indiquer un numéro de téléphone joignable.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          attending,
          guestCount: attending === 'yes' ? guestCount : 0,
          message: message.trim(),
        }),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
        rsvp?: {
          fullName: string;
          attending: 'yes' | 'no';
          guestCount: number;
        };
      };

      if (!response.ok || !payload.success || !payload.rsvp) {
        throw new Error(payload.error || 'Enregistrement impossible pour le moment.');
      }

      setSubmittedRecord(payload.rsvp);
      setFullName('');
      setPhone('');
      setGuestCount(1);
      setMessage('');
      void fetchSummary();
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue lors de l’envoi de votre réponse.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="py-20 sm:py-28 bg-[#F5EFE4]/60 border-t border-b border-[#B89352]/20"
    >
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">
            Réponse souhaitée
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1B3B2B]">
            Confirmation de Présence
          </h2>
          <p className="mt-4 text-base text-[#526157] leading-relaxed max-w-xl mx-auto">
            Afin de préparer votre accueil dans les meilleures conditions à Brazzaville, merci de
            confirmer votre venue ci-dessous.
          </p>
          <OrnamentalDivider className="mt-7" />
        </motion.div>

        {/* Form Container */}
        <div className="mt-12 bg-[#FFFDF9] border border-[#B89352]/40 p-6 sm:p-10">
          {submittedRecord ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2
                className="w-10 h-10 text-[#1B3B2B] mx-auto"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <h3 className="font-display text-3xl text-[#1B3B2B]">
                Merci, {submittedRecord.fullName}
              </h3>
              <p className="text-base text-[#526157] max-w-md mx-auto leading-relaxed">
                {submittedRecord.attending === 'yes'
                  ? `Votre présence est bien enregistrée pour ${submittedRecord.guestCount} ${
                      submittedRecord.guestCount > 1 ? 'personnes' : 'personne'
                    }. Clevy et Lorriane ont hâte de célébrer ce moment avec vous.`
                  : 'Votre message a bien été enregistré. Même à distance, vos pensées accompagnent chaleureusement Clevy et Lorriane.'}
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSubmittedRecord(null)}
                  className="px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#1B3B2B] border border-[#B89352]/60 hover:bg-[#F5EFE4] transition-colors"
                >
                  Enregistrer une autre réponse
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="rsvp-fullname"
                    className="block text-xs uppercase tracking-[0.16em] text-[#1B3B2B] mb-2"
                  >
                    Nom et prénom *
                  </label>
                  <input
                    id="rsvp-fullname"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex. : Grâce Mpassi"
                    className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#B89352]/40 text-[#1D2B22] placeholder:text-[#526157]/50 focus:outline-none focus:border-[#1B3B2B] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rsvp-phone"
                    className="block text-xs uppercase tracking-[0.16em] text-[#1B3B2B] mb-2"
                  >
                    Numéro de téléphone *
                  </label>
                  <input
                    id="rsvp-phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+242 06 000 00 00"
                    className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#B89352]/40 text-[#1D2B22] placeholder:text-[#526157]/50 focus:outline-none focus:border-[#1B3B2B] transition-colors"
                  />
                </div>
              </div>

              {/* Attendance Choice */}
              <fieldset>
                <legend className="block text-xs uppercase tracking-[0.16em] text-[#1B3B2B] mb-2.5">
                  Confirmation de présence *
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    aria-pressed={attending === 'yes'}
                    className={`px-4 py-3.5 text-sm border text-left transition-colors ${
                      attending === 'yes'
                        ? 'bg-[#1B3B2B] text-[#FBF9F5] border-[#1B3B2B]'
                        : 'bg-[#FBF9F5] text-[#1D2B22] border-[#B89352]/40 hover:border-[#1B3B2B]'
                    }`}
                  >
                    Oui, je serai présent(e) avec joie
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    aria-pressed={attending === 'no'}
                    className={`px-4 py-3.5 text-sm border text-left transition-colors ${
                      attending === 'no'
                        ? 'bg-[#1B3B2B] text-[#FBF9F5] border-[#1B3B2B]'
                        : 'bg-[#FBF9F5] text-[#1D2B22] border-[#B89352]/40 hover:border-[#1B3B2B]'
                    }`}
                  >
                    Je ne pourrai malheureusement pas venir
                  </button>
                </div>
              </fieldset>

              {/* Guest Count */}
              {attending === 'yes' && (
                <div>
                  <label
                    htmlFor="rsvp-guests"
                    className="block text-xs uppercase tracking-[0.16em] text-[#1B3B2B] mb-2"
                  >
                    Nombre de personnes
                  </label>
                  <select
                    id="rsvp-guests"
                    name="guestCount"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full sm:w-56 px-4 py-3 bg-[#FBF9F5] border border-[#B89352]/40 text-[#1D2B22] focus:outline-none focus:border-[#1B3B2B] transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6].map((count) => (
                      <option key={count} value={count}>
                        {count} {count > 1 ? 'personnes' : 'personne'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Optional Message */}
              <div>
                <label
                  htmlFor="rsvp-message"
                  className="block text-xs uppercase tracking-[0.16em] text-[#1B3B2B] mb-2"
                >
                  Un mot pour les mariés (facultatif)
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Partagez un vœu, une attention particulière ou une précision…"
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#B89352]/40 text-[#1D2B22] placeholder:text-[#526157]/50 focus:outline-none focus:border-[#1B3B2B] transition-colors resize-y"
                />
              </div>

              {errorMsg && (
                <p
                  role="alert"
                  className="px-4 py-3 bg-red-50 border border-red-200 text-sm text-red-900"
                >
                  {errorMsg}
                </p>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#526157]">
                  Vos informations restent strictement confidentielles.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium bg-[#1B3B2B] text-[#FBF9F5] hover:bg-[#12291E] disabled:opacity-60 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
                >
                  <Send className="w-4 h-4 text-[#D4B87A]" strokeWidth={1.6} aria-hidden="true" />
                  <span>{submitting ? 'Envoi en cours…' : 'Confirmer ma réponse'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Gentle Guestbook Wishes Display if guests left messages */}
        {summary && summary.recentWishes.length > 0 && (
          <div className="mt-12 pt-10 border-t border-[#B89352]/25">
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B89352] mb-6">
              <HeartHandshake className="w-4 h-4" aria-hidden="true" />
              <span>Mots laissés par nos invités</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summary.recentWishes.slice(0, 4).map((wish) => (
                <blockquote
                  key={wish.id}
                  className="p-5 bg-[#FFFDF9] border border-[#B89352]/25 text-sm"
                >
                  <p className="italic text-[#1D2B22] leading-relaxed">« {wish.message} »</p>
                  <footer className="mt-2 text-xs text-[#526157] font-medium">
                    — {wish.fullName}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
