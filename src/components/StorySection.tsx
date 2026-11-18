import { motion } from 'motion/react';
import { STORY_CHAPTERS } from '../data/weddingData';
import { EditorialImage, OrnamentalDivider } from './BotanicalOrnament';
import { ImageReveal } from './CinematicMotion';

export function StorySection() {
  return (
    <section
      id="histoire"
      className="py-20 sm:py-28 bg-[#F5EFE4]/60 border-t border-b border-[#B89352]/20"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">
            Le livre de notre union
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1B3B2B]">
            Notre Histoire
          </h2>
          <p className="mt-4 text-base text-[#526157] leading-relaxed">
            Cinq chapitres pensés comme les pages d’un journal intime, prêts à accueillir les
            souvenirs et les mots authentiques de Clevy et Lorriane.
          </p>
          <OrnamentalDivider className="mt-7" />
        </motion.div>

        {/* Vertical Timeline */}
        <div className="relative mt-16 sm:mt-20">
          {/* Vertical gold hairline */}
          <div
            aria-hidden="true"
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#B89352]/40 md:-translate-x-1/2"
          />

          <div className="space-y-16 sm:space-y-24">
            {STORY_CHAPTERS.map((chapter, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.article
                  key={chapter.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center pl-11 md:pl-0"
                >
                  {/* Timeline Node */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FBF9F5] border-2 border-[#B89352] z-10"
                  />

                  {/* Photo Column */}
                  <div className={isEven ? 'md:order-1 md:pr-6' : 'md:order-2 md:pl-6'}>
                    <figure className="bg-[#FFFDF9] p-2.5 sm:p-3 border border-[#B89352]/30">
                      <ImageReveal className="aspect-[4/3] w-full">
                        <EditorialImage
                          src={chapter.imageUrl}
                          alt={chapter.imageAlt}
                          className="h-full w-full"
                          imgClassName="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                          fallbackTitle={chapter.title}
                        />
                      </ImageReveal>
                      <figcaption className="pt-2.5 pb-0.5 text-center font-display italic text-xs text-[#526157]">
                        {chapter.imageCaption}
                      </figcaption>
                    </figure>
                  </div>

                  {/* Narrative Text Column */}
                  <div
                    className={`${
                      isEven ? 'md:order-2 md:pl-6' : 'md:order-1 md:pr-6 md:text-right'
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-[#B89352]">
                      {chapter.numeral}
                      <span aria-hidden="true" className="mx-2">
                        ·
                      </span>
                      {chapter.subtitle}
                    </p>
                    <h3 className="mt-2 font-display text-3xl sm:text-[34px] font-medium text-[#1B3B2B]">
                      {chapter.title}
                    </h3>
                    <p
                      className={`mt-4 text-[15px] sm:text-base leading-[1.85] text-[#1D2B22] ${
                        index === 0 && !isEven ? '' : ''
                      }`}
                    >
                      {chapter.content}
                    </p>
                    <p className="mt-3 text-xs italic text-[#526157]/80">
                      {chapter.editableNote}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
