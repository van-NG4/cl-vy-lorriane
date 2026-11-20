import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { STORY_CHAPTERS } from '../data/weddingData';
import { OrnamentalDivider } from './BotanicalOrnament';

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, restDelta: 0.001 });
  const timelineScale = useTransform(smoothProgress, [0.12, 0.82], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="histoire"
      className="relative isolate overflow-hidden border-t border-b border-[#D96B32]/20 bg-[#FFFDF9]"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-20 h-40 w-40 rounded-full bg-[#E99A61]/10 blur-3xl" />
        <div className="absolute bottom-32 right-0 h-52 w-52 rounded-full bg-[#A94F32]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.26em] text-[#D96B32]">Notre livre d’amour</p>
          <h2 className="mt-3 font-display text-5xl font-medium leading-[0.95] text-[#432B24] sm:text-7xl">
            Les pages de notre histoire
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-display text-xl italic leading-relaxed text-[#5A382B] sm:text-2xl">
            Chaque belle histoire commence quelque part. La nôtre a commencé par une rencontre inattendue, s’est construite
            dans la foi et la complicité, et nous conduit aujourd’hui vers une belle promesse.
          </p>
          <OrnamentalDivider className="mt-8" />
        </motion.div>

        <div className="relative mt-16 sm:mt-24">
          <div className="absolute bottom-0 left-4 top-0 w-px origin-top bg-[#B89352]/25 md:left-1/2" aria-hidden="true">
            <motion.div
              className="absolute inset-x-0 top-0 h-full origin-top bg-[#B89352]"
              style={prefersReducedMotion ? undefined : { scaleY: timelineScale }}
            />
          </div>

          <div className="space-y-20 sm:space-y-28">
            {STORY_CHAPTERS.map((chapter, index) => {
              const even = index % 2 === 0;
              return (
                <motion.article
                  key={chapter.id}
                  id={chapter.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-1 items-center gap-8 pl-11 md:grid-cols-2 md:gap-16 md:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-7 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#B89352] bg-[#FBF9F5] shadow-[0_0_0_6px_rgba(251,249,245,.9)] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                  />

                  <motion.figure
                    initial={prefersReducedMotion ? false : { opacity: 0, clipPath: 'inset(12% 0 12% 0)' }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 1, ease: [0.22, 1, 0.36, 1] }}
                    className={`${even ? 'md:order-1 md:pr-7' : 'md:order-2 md:pl-7'} overflow-hidden`}
                  >
                    <div className="border border-[#B89352]/35 bg-[#FFFDF9]/70 p-2.5 shadow-[0_24px_70px_rgba(70,54,47,.12)] backdrop-blur-[2px] sm:p-3">
                      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
                        <motion.img
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover object-center"
                          whileInView={prefersReducedMotion ? undefined : { scale: [1.04, 1] }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                      <figcaption className="px-2 py-3 text-center font-display text-sm italic text-[#526157]">
                        {chapter.imageCaption}
                      </figcaption>
                    </div>
                  </motion.figure>

                  <div className={`${even ? 'md:order-2 md:pl-7' : 'md:order-1 md:pr-7 md:text-right'} rounded-sm border border-[#B89352]/20 bg-[#FFFDF9]/78 px-6 py-7 shadow-[0_20px_60px_rgba(70,54,47,.08)] backdrop-blur-md sm:px-9 sm:py-9`}>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#A27D43]">
                      {chapter.numeral} <span aria-hidden="true">·</span> {chapter.subtitle}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-[#1B3B2B] sm:text-5xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-5 font-display text-lg italic leading-relaxed text-[#8D7555] sm:text-xl">
                      {chapter.hook}
                    </p>
                    <div className="mt-5 space-y-4 text-[15px] leading-[1.85] text-[#1D2B22] sm:text-base">
                      {chapter.content.split('\n\n').map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <div className={`mt-7 h-px w-16 bg-[#B89352]/60 ${even ? '' : 'md:ml-auto'}`} />
                    <p className="mt-5 font-script text-3xl leading-snug text-[#F6A600] sm:text-[34px]">
                      {chapter.conclusion}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9 }}
          className="mx-auto mt-24 max-w-3xl border-y border-[#B89352]/35 py-10 text-center sm:mt-32 sm:py-14"
        >
          <p className="font-script text-4xl leading-tight text-[#8D7555] sm:text-5xl">
            « Et maintenant, avec Dieu pour guide, nous écrivons ensemble les plus belles pages de notre histoire. »
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          className="mt-10 text-center"
        >
          <a
            href="#rendez-vous"
            className="inline-flex min-h-11 items-center px-5 text-xs uppercase tracking-[0.18em] text-[#1B3B2B] underline decoration-[#B89352] underline-offset-8 transition-colors hover:text-[#8D7555]"
          >
            Découvrir la suite de notre histoire
          </a>
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-[#A27D43]">Genèse 2:24</p>
          <blockquote className="mt-3 font-display text-lg italic leading-relaxed text-[#526157] sm:text-xl">
            « C’est pourquoi l’homme quittera son père et sa mère, et s’attachera à sa femme, et ils deviendront une seule
            chair. »
          </blockquote>
        </div>
      </div>
    </section>
  );
}
