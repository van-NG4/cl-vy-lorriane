import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { WEDDING_ASSETS } from '../data/weddingData';
import { BotanicalSprig } from './BotanicalOrnament';

export function HeroSection() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] items-end overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      <div className="hero-motion-background" aria-hidden="true">
        <iframe
          className="hero-motion-frame"
          src="/hero-motion.html"
          title=""
          tabIndex={-1}
        />
        <div className="hero-motion-vignette" />
      </div>

      <BotanicalSprig className="pointer-events-none absolute -top-4 -left-8 w-44 sm:w-56 opacity-75 botanical-sway" />
      <BotanicalSprig
        flipX
        flipY
        className="pointer-events-none hidden md:block absolute bottom-4 -right-8 w-52 opacity-65 botanical-sway"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4">
          <a
            href="#histoire"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium bg-[#B89352] text-[#432B24] hover:bg-[#D96B32] hover:text-[#FFFDF9] transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
          >
            <span>Découvrir notre histoire</span>
            <ArrowDown className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
          </a>

          <a
            href={WEDDING_ASSETS.invitation}
            download
            className="inline-flex items-center justify-center px-7 py-4 text-xs uppercase tracking-[0.18em] font-medium text-[#FFFDF9] border border-[#FFFDF9]/75 bg-[#432B24]/20 backdrop-blur-sm hover:border-[#FFFDF9] hover:bg-[#432B24]/45 transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFDF9]"
          >
            Télécharger l'invitation
          </a>
        </div>
      </motion.div>
    </section>
  );
}
