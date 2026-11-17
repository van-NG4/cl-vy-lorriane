import { motion } from 'motion/react';
import { Clock, MapPin } from 'lucide-react';
import { PROGRAM_DAYS } from '../data/weddingData';
import { EditorialImage, OrnamentalDivider } from './BotanicalOrnament';
import { ImageReveal } from './CinematicMotion';

export function ProgramSection() {
  return (
    <section
      id="programme"
      className="py-20 sm:py-28 bg-[#F5EFE4]/60 border-t border-b border-[#B89352]/20"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">
            Deux journées d’exception
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1B3B2B]">
            Le Programme
          </h2>
          <p className="mt-4 text-base text-[#526157] leading-relaxed">
            Nos célébrations se déploieront sur deux jours à Brazzaville. Les horaires exacts et les
            adresses précises seront communiqués dès leur validation finale.
          </p>
          <OrnamentalDivider className="mt-7" />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROGRAM_DAYS.map((day, idx) => (
            <motion.article
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#FFFDF9] border border-[#B89352]/35 flex flex-col"
            >
              <ImageReveal className="aspect-[16/10] w-full">
                <EditorialImage
                  src={day.imageUrl}
                  alt={day.imageAlt}
                  className="h-full w-full"
                  imgClassName="w-full h-full object-cover"
                  fallbackTitle={day.dateLabel}
                />
              </ImageReveal>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-[#B89352]">
                  {day.dayNumber}
                  <span aria-hidden="true" className="mx-2">
                    ·
                  </span>
                  {day.dateLabel}
                </p>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-[#1B3B2B]">
                  {day.title}
                </h3>

                <div className="mt-5 py-4 border-t border-b border-[#B89352]/20 space-y-2.5 text-sm text-[#1D2B22]">
                  <div className="flex items-start gap-3">
                    <Clock
                      className="w-4 h-4 text-[#B89352] mt-0.5 shrink-0"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span>{day.time}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-4 h-4 text-[#B89352] mt-0.5 shrink-0"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <span>{day.address}</span>
                  </div>
                </div>

                <p className="mt-5 text-[15px] leading-[1.8] text-[#526157] flex-1">
                  {day.description}
                </p>

                <p className="mt-5 text-xs italic text-[#526157]/80">{day.editableNotice}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
