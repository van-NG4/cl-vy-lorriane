import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

const INTRO_STORAGE_KEY = 'clery-loriane-intro-seen';

function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === 'true';
  } catch {
    return true;
  }
}

function rememberIntro(): void {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
  } catch {
    // The intro still stays dismissed for the current app session.
  }
}

export function EnvelopeIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasSeenIntro());
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) return;
    const timer = window.setTimeout(() => {
      rememberIntro();
      setVisible(false);
    }, prefersReducedMotion ? 1800 : 2900);
    return () => window.clearTimeout(timer);
  }, [opened, prefersReducedMotion]);

  const skipIntro = () => {
    rememberIntro();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="envelope-intro-title"
          className="fixed inset-0 z-[70] flex min-h-[100svh] items-start justify-center overflow-y-auto bg-[#F1E9DC] px-5 py-5 text-[#46362F] sm:items-center sm:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.65 } }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-4 border border-[#C6A477]/45 sm:inset-8" aria-hidden="true" />
          <div className="relative z-10 my-auto flex w-full max-w-lg flex-col items-center text-center">
            <p className="font-display text-lg italic text-[#8D7555] sm:text-xl">
              Une histoire qui s’écrit à deux
            </p>
            <h1 id="envelope-intro-title" className="mt-2 text-xs uppercase tracking-[0.24em] text-[#63574A]">
              Une invitation pour vous
            </h1>

            <button
              type="button"
              onClick={() => setOpened(true)}
              aria-label={opened ? 'Invitation ouverte' : 'Ouvrir l’invitation'}
              aria-expanded={opened}
              className={`envelope-scene mt-7 h-44 w-[min(82vw,22rem)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D7555] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F1E9DC] sm:mt-12 sm:h-56 ${opened ? 'is-open' : ''}`}
            >
              <span className="envelope-shadow" aria-hidden="true" />
              <span className="envelope-card" aria-hidden="true">
                <span className="envelope-card-rule" />
                <span className="font-script text-4xl leading-none text-[#46362F] sm:text-5xl">Clery &amp; Loriane</span>
                <span className="mt-3 block text-[9px] uppercase tracking-[0.19em] text-[#8D7555]">
                  27 &amp; 28 février · Brazzaville
                </span>
              </span>
              <span className="envelope-back" aria-hidden="true" />
              <span className="envelope-flap" aria-hidden="true" />
              <span className="envelope-front" aria-hidden="true" />
              <span className="envelope-seal" aria-hidden="true">C&nbsp;L</span>
            </button>

            <motion.p
              className="mt-6 font-display text-2xl italic text-[#46362F] sm:mt-8"
              animate={{ opacity: opened ? 0 : 1, y: opened ? -5 : 0 }}
              transition={{ duration: 0.35 }}
            >
              {opened ? 'Avec tout notre amour' : 'Touchez pour ouvrir'}
            </motion.p>
            <motion.p
              aria-live="polite"
              className="mt-2 font-script text-5xl text-[#46362F] sm:text-6xl"
              initial={false}
              animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: opened && !prefersReducedMotion ? 0.7 : 0 }}
            >
              Clery &amp; Loriane
            </motion.p>
            <button
              type="button"
              onClick={skipIntro}
              className="mt-6 min-h-11 px-5 text-xs uppercase tracking-[0.16em] text-[#63574A] underline decoration-[#C6A477] underline-offset-4 hover:text-[#46362F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8D7555] sm:mt-9"
            >
              Passer l’introduction
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[#C6A477]"
      style={{ scaleX }}
    />
  );
}

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
}

export function ImageReveal({ children, className = '' }: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={prefersReducedMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
      whileInView={prefersReducedMotion ? undefined : { clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
