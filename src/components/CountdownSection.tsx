import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { CalendarPlus, ChevronDown, Download, ExternalLink } from 'lucide-react';
import { WEDDING_IDENTITY } from '../data/weddingData';
import { downloadWeddingIcs, getGoogleCalendarUrl } from '../utils/downloads';
import { OrnamentalDivider } from './BotanicalOrnament';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeCountdown(targetIso: string): CountdownValues {
  const target = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<CountdownValues>(() =>
    computeCountdown(WEDDING_IDENTITY.targetIsoDate),
  );
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(computeCountdown(WEDDING_IDENTITY.targetIsoDate));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setCalendarMenuOpen(false);
      }
    }
    if (calendarMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [calendarMenuOpen]);

  const units = [
    { label: 'Jours', value: String(timeLeft.days) },
    { label: 'Heures', value: padTwo(timeLeft.hours) },
    { label: 'Minutes', value: padTwo(timeLeft.minutes) },
    { label: 'Secondes', value: padTwo(timeLeft.seconds) },
  ];

  return (
    <section
      id="rendez-vous"
      className="py-20 sm:py-28 bg-[#1B3B2B] text-[#FBF9F5] relative overflow-hidden"
    >
      {/* Subtle framed hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-8 border border-[#D4B87A]/25"
      />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.26em] text-[#D4B87A]">
            Le grand rendez-vous
          </p>

          <h2 className="mt-4 font-display text-4xl sm:text-6xl font-medium tracking-wide text-[#FBF9F5]">
            {WEDDING_IDENTITY.datesUppercase}
          </h2>
          <p className="mt-2 font-display text-xl sm:text-2xl tracking-[0.24em] uppercase text-[#D4B87A]">
            {WEDDING_IDENTITY.city}
          </p>
          <p className="mt-1 text-sm text-[#FBF9F5]/75">République du Congo</p>

          <OrnamentalDivider className="my-8" />

          {/* Live Dynamic Countdown */}
          {timeLeft.isPast ? (
            <p className="font-display italic text-2xl sm:text-3xl text-[#D4B87A] py-6">
              Le grand jour est arrivé — célébrons l’union de Clery &amp; Loriane.
            </p>
          ) : (
            <div
              role="timer"
              aria-live="off"
              aria-label="Compte à rebours jusqu'au mariage"
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
            >
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="py-5 px-3 bg-[#12291E]/70 border border-[#D4B87A]/30"
                >
                  <div className="font-display tabular-nums text-4xl sm:text-5xl font-medium text-[#FBF9F5]">
                    {unit.value}
                  </div>
                  <div className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-[#D4B87A]">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to Calendar Dropdown Action */}
          <div className="mt-10 relative inline-block" ref={menuRef}>
            <button
              type="button"
              onClick={() => setCalendarMenuOpen((prev) => !prev)}
              aria-expanded={calendarMenuOpen}
              aria-haspopup="menu"
              className="inline-flex items-center justify-center gap-3 px-7 py-4 text-xs uppercase tracking-[0.18em] font-medium bg-[#FBF9F5] text-[#1B3B2B] hover:bg-[#F5EFE4] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B87A]"
            >
              <CalendarPlus className="w-4 h-4 text-[#B89352]" strokeWidth={1.6} aria-hidden="true" />
              <span>Ajouter à mon calendrier</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  calendarMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {calendarMenuOpen && (
              <div
                role="menu"
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#FFFDF9] text-[#1D2B22] border border-[#B89352]/50 shadow-lg z-20 py-1 text-left"
              >
                <a
                  role="menuitem"
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-sm hover:bg-[#F5EFE4] transition-colors"
                >
                  <span>Google Agenda</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B89352]" aria-hidden="true" />
                </a>
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    downloadWeddingIcs();
                    setCalendarMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-[#F5EFE4] transition-colors border-t border-[#B89352]/20"
                >
                  <span>Apple / Outlook (.ics)</span>
                  <Download className="w-3.5 h-3.5 text-[#B89352]" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
