import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { WEDDING_ASSETS, WEDDING_IDENTITY } from '../data/weddingData';
import { BotanicalSprig, OrnamentalDivider } from './BotanicalOrnament';
import heroBackgroundVideo from '../assets/images/Clery & Loriane — Une histoire qui s’écrit à deux_720p.mp4';
import heroPortraitFallback from '../assets/images/couple_hero_portrait_1794908618282.jpg';

function canPlayBackgroundVideo(): boolean {
  if (typeof window === 'undefined') return false;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const connection = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  return !reducedMotion && !connection?.saveData && connection?.effectiveType !== '2g';
}

export function HeroSection() {
  const [videoReady, setVideoReady] = useState(canPlayBackgroundVideo);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateVideoForMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setVideoReady(false);
        setVideoLoaded(false);
      } else {
        setVideoReady(canPlayBackgroundVideo());
      }
    };
    motionPreference.addEventListener('change', updateVideoForMotionPreference);
    return () => motionPreference.removeEventListener('change', updateVideoForMotionPreference);
  }, []);

  useEffect(() => {
    if (!videoReady || !videoRef.current) return;
    void videoRef.current.play().catch(() => {
      // Keep the poster visible if a browser blocks autoplay; do not remove the background layer.
    });
  }, [videoReady]);

  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 paper-texture"
    >
      <div className={`hero-film-background african-sunset-hero ${videoLoaded ? 'is-loaded' : ''}`} aria-hidden="true">
        <div
          className="hero-film-poster"
          style={{ backgroundImage: `url(${heroPortraitFallback})` }}
        />
        {videoReady && (
          <video
            ref={videoRef}
            className={`hero-film-video ${videoLoaded ? 'is-loaded' : ''}`}
            src={heroBackgroundVideo}
            poster={WEDDING_ASSETS.heroPortrait}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onCanPlay={() => setVideoLoaded(true)}
            onError={(event) => {
              event.currentTarget.hidden = true;
            }}
          />
        )}
        <div className="hero-film-wash" />
      </div>

      {/* Subtle botanical corner ornaments */}
      <BotanicalSprig className="pointer-events-none absolute -top-4 -left-8 w-44 sm:w-56 opacity-75 botanical-sway" />
      <BotanicalSprig
        flipX
        flipY
        className="pointer-events-none hidden md:block absolute bottom-4 -right-8 w-52 opacity-65 botanical-sway"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Editorial copy stays on the calm side of the moving image. */}
          <div className="hero-copy-panel lg:col-span-7 flex flex-col justify-center text-center lg:text-left py-5 sm:py-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-xl sm:text-2xl text-[#B89352] tracking-wide"
            >
              « Deux cœurs, deux chemins, une seule histoire qui commence à s’écrire pour toujours. »
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-script text-6xl sm:text-7xl xl:text-[5.5rem] leading-[1.08] text-[#1B3B2B] font-normal"
            >
              <span className="sr-only">Clevy et Lorriane — Mariage à Brazzaville</span>
              <span aria-hidden="true">Clevy &amp; Lorriane</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 font-display text-2xl sm:text-3xl text-[#1D2B22] tracking-wide"
            >
              {WEDDING_IDENTITY.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#526157]"
            >
              <span>{WEDDING_IDENTITY.datesUppercase}</span>
              <span aria-hidden="true" className="text-[#B89352]">
                ·
              </span>
              <span>{WEDDING_IDENTITY.locationFull}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="my-7 flex justify-center lg:justify-start"
            >
              <OrnamentalDivider />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#histoire"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium bg-[#B89352] text-[#1B3B2B] hover:bg-[#A67C2D] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
              >
                <span>Découvrir notre histoire</span>
                <ArrowDown className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              </a>

              <a
                href={WEDDING_ASSETS.invitation}
                download
                className="inline-flex items-center justify-center px-7 py-4 text-xs uppercase tracking-[0.18em] font-medium text-[#1B3B2B] border border-[#B89352]/70 hover:border-[#1B3B2B] hover:bg-[#F5EFE4] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
              >
                Télécharger l'invitation
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
