import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { WEDDING_ASSETS, WEDDING_IDENTITY } from '../data/weddingData';
import { BotanicalSprig, EditorialImage, OrnamentalDivider } from './BotanicalOrnament';
import { ImageReveal } from './CinematicMotion';

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28 overflow-hidden paper-texture"
    >
      {/* Subtle botanical corner ornaments */}
      <BotanicalSprig className="pointer-events-none absolute -top-4 -left-8 w-44 sm:w-56 opacity-75 botanical-sway" />
      <BotanicalSprig
        flipX
        flipY
        className="pointer-events-none hidden md:block absolute bottom-4 -right-8 w-52 opacity-65 botanical-sway"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left Column: Progressive Literary Opening */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left py-2">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display italic text-xl sm:text-2xl text-[#B89352] tracking-wide"
            >
              {WEDDING_IDENTITY.openingPrelude}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-script text-6xl sm:text-7xl xl:text-[5.5rem] leading-[1.08] text-[#1B3B2B] font-normal"
            >
              <span className="sr-only">Clery et Loriane — Mariage à Brazzaville</span>
              <span aria-hidden="true">Clery &amp; Loriane</span>
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

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto lg:mx-0 text-base sm:text-[17px] leading-[1.8] text-[#526157] italic"
            >
              « Deux cœurs, deux chemins, une seule histoire qui commence à s’écrire pour toujours. »
            </motion.p>
            <p className="mt-3 max-w-xl mx-auto text-sm leading-relaxed text-[#526157] lg:mx-0">
              {WEDDING_IDENTITY.emotionalSignature}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#histoire"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium bg-[#1B3B2B] text-[#FBF9F5] hover:bg-[#12291E] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
              >
                <span>Découvrir notre histoire</span>
                <ArrowDown className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              </a>

              <a
                href="#rsvp"
                className="inline-flex items-center justify-center px-7 py-4 text-xs uppercase tracking-[0.18em] font-medium text-[#1B3B2B] border border-[#B89352]/70 hover:border-[#1B3B2B] hover:bg-[#F5EFE4] transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
              >
                Confirmer sa présence
              </a>
            </motion.div>
          </div>

          {/* Right Column: Couple Portrait in Editorial Botanical Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="relative w-full p-3 sm:p-4 bg-[#FFFDF9] border border-[#B89352]/40">
              {/* Inner hairline border */}
              <div className="relative h-full border border-[#B89352]/30 p-2 bg-[#FBF9F5]">
                <ImageReveal className="w-full aspect-[3/4] lg:h-full">
                  <EditorialImage
                    src={WEDDING_ASSETS.heroPortrait}
                    alt="Portrait de Clery et Loriane dans la lumière dorée d'un jardin"
                    loading="eager"
                    className="w-full h-full"
                    imgClassName="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                    fallbackTitle="Clery & Loriane"
                  />
                </ImageReveal>
                <div className="pt-3 pb-1 px-2 flex items-center justify-between text-xs text-[#526157] font-display italic">
                  <span>{WEDDING_IDENTITY.centralConcept}</span>
                  <span className="text-[#B89352]">2027</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
