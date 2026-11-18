import { motion } from 'motion/react';
import { WEDDING_ASSETS, WEDDING_IDENTITY } from '../data/weddingData';
import { BotanicalSprig, EditorialImage, OrnamentalDivider } from './BotanicalOrnament';

export function ClosingSection() {
  return (
    <>
      <section className="py-20 sm:py-28 bg-[#FBF9F5] paper-texture relative overflow-hidden">
        <BotanicalSprig
          flipY
          className="pointer-events-none hidden md:block absolute top-6 -left-8 w-44 opacity-55 botanical-sway"
        />
        <BotanicalSprig
          flipX
          className="pointer-events-none hidden md:block absolute bottom-6 -right-8 w-44 opacity-55 botanical-sway"
        />

        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center"
          >
            <div className="md:col-span-5">
              <div className="p-3 bg-[#FFFDF9] border border-[#B89352]/35">
                <EditorialImage
                  src={WEDDING_ASSETS.storyWalk}
                  alt="Clevy et Lorriane marchant ensemble, sourire complice"
                  className="aspect-[4/3] w-full"
                  imgClassName="w-full h-full object-cover"
                  fallbackTitle="Clevy & Lorriane"
                />
              </div>
            </div>

            <div className="md:col-span-7 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">Mot de fin</p>

              <blockquote className="mt-4 font-display italic text-2xl sm:text-3xl leading-[1.5] text-[#1B3B2B]">
                « {WEDDING_IDENTITY.closingText} »
              </blockquote>

              <div className="my-6 flex justify-center md:justify-start">
                <OrnamentalDivider />
              </div>

              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.18em] text-[#526157]">Avec amour,</p>
                <p className="font-script text-4xl sm:text-5xl text-[#1B3B2B]">
                  Clevy &amp; Lorriane.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#12291E] text-[#FBF9F5]/80 py-10 border-t border-[#D4B87A]/25">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-display italic text-base text-[#FBF9F5]">
            {WEDDING_IDENTITY.coupleNames}
            <span aria-hidden="true" className="mx-2 text-[#D4B87A]">
              ·
            </span>
            {WEDDING_IDENTITY.datesLabel}
            <span aria-hidden="true" className="mx-2 text-[#D4B87A]">
              ·
            </span>
            {WEDDING_IDENTITY.city}
          </p>

          <nav aria-label="Navigation pied de page" className="flex flex-wrap items-center justify-center gap-5">
            <a href="#accueil" className="hover:text-[#D4B87A] transition-colors">
              Accueil
            </a>
            <a href="#histoire" className="hover:text-[#D4B87A] transition-colors">
              Notre histoire
            </a>
            <a href="#invitation" className="hover:text-[#D4B87A] transition-colors">
              Invitation
            </a>
            <a href="#programme" className="hover:text-[#D4B87A] transition-colors">
              Programme
            </a>
            <a href="#rsvp" className="hover:text-[#D4B87A] transition-colors">
              RSVP
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
