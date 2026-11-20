import { motion } from 'motion/react';
import { OrnamentalDivider } from './BotanicalOrnament';

export function RsvpSection() {
  return (
    <section
      id="rsvp"
      className="py-20 sm:py-28 bg-[#F5EFE4]/60 border-t border-b border-[#B89352]/20"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
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

        <div className="mt-12 overflow-hidden bg-[#FFFDF9] border border-[#B89352]/40">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdxuQKRrrXOw0IVYTIoId2CReyj2N4IJU2zf0N7MU1VoVMB5Q/viewform?embedded=true"
            title="Confirmation de présence"
            width="100%"
            height="1145"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            loading="lazy"
            className="block w-full max-w-full"
            allowFullScreen
          >
            Chargement…
          </iframe>
        </div>
      </div>
    </section>
  );
}
