import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryCategory } from '../data/weddingData';
import { EditorialImage, OrnamentalDivider } from './BotanicalOrnament';

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Tous');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const visibleItems =
    activeCategory === 'Tous'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + visibleItems.length) % visibleItems.length,
    );
  }, [visibleItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % visibleItems.length));
  }, [visibleItems.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  const activePhoto = selectedIndex !== null ? visibleItems[selectedIndex] : null;

  return (
    <section id="galerie" className="py-20 sm:py-28 bg-[#FBF9F5] paper-texture">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">
            Albums &amp; instants choisis
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1B3B2B]">
            Galerie Photographique
          </h2>
          <p className="mt-4 text-base text-[#526157] leading-relaxed">
            Une mise en page éditoriale réunissant les portraits du couple, les souvenirs précieux,
            les préparatifs et les moments forts de cette aventure.
          </p>
          <OrnamentalDivider className="mt-7" />
        </motion.div>

        {/* Interactive Category Tabs */}
        <div
          role="tablist"
          aria-label="Filtrer la galerie par thème"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {GALLERY_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedIndex(null);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-[0.14em] whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] ${
                  isActive
                    ? 'bg-[#1B3B2B] text-[#FBF9F5]'
                    : 'bg-[#F5EFE4] text-[#526157] hover:text-[#1B3B2B] border border-[#B89352]/25'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Editorial Magazine Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
          {visibleItems.map((item, idx) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`${
                activeCategory === 'Tous' ? item.spanClass : 'md:col-span-6'
              } group bg-[#FFFDF9] p-3 border border-[#B89352]/30 flex flex-col`}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Agrandir la photographie : ${item.title}`}
                className={`relative w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] ${
                  activeCategory === 'Tous' ? item.aspectClass : 'aspect-[4/3]'
                }`}
              >
                <EditorialImage
                  src={item.imageUrl}
                  alt={item.alt}
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  fallbackTitle={item.title}
                />
                <span className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-[#FBF9F5]/90 text-[#1B3B2B] border border-[#B89352]/40 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </span>
              </button>

              <figcaption className="pt-3 px-1 flex items-baseline justify-between gap-4">
                <div>
                  <p className="font-display text-lg text-[#1B3B2B]">{item.title}</p>
                  <p className="text-xs text-[#526157] mt-0.5">{item.caption}</p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#B89352] whitespace-nowrap shrink-0">
                  {item.category}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Fullscreen Magazine Lightbox */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visionneuse : ${activePhoto.title}`}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#12291E]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Fermer la visionneuse"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center bg-[#FBF9F5] text-[#1B3B2B] hover:bg-[#F5EFE4] transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {visibleItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Photographie précédente"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#FBF9F5]/90 text-[#1B3B2B] hover:bg-[#FBF9F5] transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Photographie suivante"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#FBF9F5]/90 text-[#1B3B2B] hover:bg-[#FBF9F5] transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              const startX = touchStartX.current;
              const endX = e.changedTouches[0]?.clientX;
              touchStartX.current = null;
              if (startX === null || endX === undefined || Math.abs(endX - startX) < 48) return;
              if (endX < startX) showNext();
              else showPrev();
            }}
            className="max-w-4xl w-full flex flex-col items-center text-center"
          >
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.alt}
              draggable={false}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto object-contain border border-[#D4B87A]/40 bg-[#FFFDF9] p-1.5"
            />
            <div className="mt-4 max-w-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4B87A]">
                {activePhoto.category}
              </p>
              <h3 className="mt-1 font-display text-2xl text-[#FBF9F5]">{activePhoto.title}</h3>
              <p className="mt-1 text-sm text-[#FBF9F5]/80">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
