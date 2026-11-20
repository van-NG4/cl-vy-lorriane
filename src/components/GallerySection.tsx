import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, Download, Image as ImageIcon, X } from 'lucide-react';
import { GALLERY_CHAPTERS, GALLERY_PHOTOS, type GalleryChapterId, type GalleryPhoto } from '../data/gallery';
import { OrnamentalDivider } from './BotanicalOrnament';

export function GallerySection() {
  const [mode, setMode] = useState<'story' | 'gallery'>('story');
  const [filter, setFilter] = useState<GalleryChapterId | 'all'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [archiveStatus, setArchiveStatus] = useState<'idle' | 'checking' | 'available' | 'missing'>('idle');
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const visiblePhotos =
    filter === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.chapter === filter);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(() => {
    setSelectedIndex((current) =>
      current === null ? null : (current - 1 + visiblePhotos.length) % visiblePhotos.length,
    );
  }, [visiblePhotos.length]);
  const showNext = useCallback(() => {
    setSelectedIndex((current) => (current === null ? null : (current + 1) % visiblePhotos.length));
  }, [visiblePhotos.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrev();
      if (event.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  const activePhoto = selectedIndex === null ? null : visiblePhotos[selectedIndex];

  const openPhoto = (photo: GalleryPhoto) => {
    setSelectedIndex(visiblePhotos.findIndex((item) => item.id === photo.id));
  };

  const downloadPhoto = (photo: GalleryPhoto) => {
    const link = document.createElement('a');
    link.href = photo.downloadSrc;
    link.download = `clevy-lorriane-${photo.id}.jpeg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    let cancelled = false;
    setArchiveStatus('checking');
    fetch('/downloads/album-fiancailles.zip', { method: 'HEAD', cache: 'no-store' })
      .then((response) => {
        const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
        const isZip = contentType.includes('zip') || contentType.includes('octet-stream');
        if (!cancelled) setArchiveStatus(response.ok && isZip ? 'available' : 'missing');
      })
      .catch(() => {
        if (!cancelled) setArchiveStatus('missing');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="galerie" className="py-20 sm:py-28 bg-[#FBF9F5] paper-texture overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">Les fiançailles</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1B3B2B]">
            Une histoire qui s’écrit à deux
          </h2>
          <p className="mt-4 text-base text-[#526157] leading-relaxed">
            Revivez les souvenirs de ces fiançailles, chapitre après chapitre, ou explorez librement chaque photographie.
          </p>
          <OrnamentalDivider className="mt-7" />
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div
            className="inline-flex p-1 bg-[#F5EFE4] border border-[#B89352]/25"
            role="tablist"
            aria-label="Mode d’affichage de la galerie"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'story'}
              onClick={() => setMode('story')}
              className={`px-5 py-3 text-xs uppercase tracking-[0.14em] transition-colors ${
                mode === 'story' ? 'bg-[#1B3B2B] text-[#FBF9F5]' : 'text-[#526157]'
              }`}
            >
              Le récit
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'gallery'}
              onClick={() => setMode('gallery')}
              className={`px-5 py-3 text-xs uppercase tracking-[0.14em] transition-colors ${
                mode === 'gallery' ? 'bg-[#1B3B2B] text-[#FBF9F5]' : 'text-[#526157]'
              }`}
            >
              Galerie libre
            </button>
          </div>
        </div>

        {GALLERY_PHOTOS.length === 0 ? (
          <div className="mt-12 py-16 border border-[#B89352]/30 text-center bg-[#FFFDF9]">
            <ImageIcon className="mx-auto w-8 h-8 text-[#B89352]" strokeWidth={1.4} />
            <p className="mt-4 font-display text-2xl text-[#1B3B2B]">Les souvenirs arrivent bientôt</p>
            <p className="mt-2 text-sm text-[#526157]">Les photographies seront bientôt accessibles ici.</p>
          </div>
        ) : mode === 'story' ? (
          <div className="mt-16 space-y-24 sm:space-y-32">
            {GALLERY_CHAPTERS.map((chapter, chapterIndex) => {
              const photos = GALLERY_PHOTOS.filter((photo) => photo.chapter === chapter.id).sort(
                (a, b) => a.order - b.order,
              );
              if (!photos.length) return null;
              const featured = photos.find((photo) => photo.featured) ?? photos[0];
              const selection = photos.filter((photo) => photo.id !== featured.id).slice(0, 6);
              return (
                <motion.article
                  key={chapter.id}
                  id={chapter.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.75 }}
                >
                  <header className="mb-8 sm:mb-10 max-w-3xl">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">{chapter.numeral}</p>
                    <h3 className="mt-2 font-display text-4xl sm:text-6xl text-[#1B3B2B]">{chapter.title}</h3>
                    <p className="mt-4 text-base text-[#526157] max-w-xl leading-relaxed">
                      {chapter.introduction}
                    </p>
                  </header>

                  <button
                    type="button"
                    onClick={() => openPhoto(featured)}
                    className="group relative block w-full overflow-hidden border border-[#B89352]/30 bg-[#F5EFE4] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
                  >
                    <img
                      src={featured.src}
                      alt={featured.alt}
                      loading="lazy"
                      width="1600"
                      height="1067"
                      className="w-full max-h-[680px] object-contain bg-[#F5EFE4] transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                    <span className="absolute bottom-4 right-4 w-11 h-11 flex items-center justify-center bg-[#FBF9F5]/95 text-[#1B3B2B]">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </button>

                  {selection.length > 0 && (
                    <div className="mt-5 columns-1 sm:columns-2 lg:columns-3 gap-5">
                      {selection.map((photo) => (
                        <button
                          key={photo.id}
                          type="button"
                          onClick={() => openPhoto(photo)}
                          className="group mb-5 block w-full break-inside-avoid overflow-hidden border border-[#B89352]/25 bg-[#FFFDF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            loading="lazy"
                            width="900"
                            height="1200"
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {chapterIndex < GALLERY_CHAPTERS.length - 1 && (
                    <a
                      href={`#${GALLERY_CHAPTERS[chapterIndex + 1].id}`}
                      className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#1B3B2B] border-b border-[#B89352] pb-2"
                    >
                      Chapitre suivant <ArrowDown className="w-4 h-4" />
                    </a>
                  )}
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="mt-12">
            <div
              className="flex flex-wrap items-center justify-center gap-2"
              role="tablist"
              aria-label="Filtrer par chapitre"
            >
              <button
                type="button"
                role="tab"
                aria-selected={filter === 'all'}
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                  filter === 'all' ? 'bg-[#1B3B2B] text-[#FBF9F5]' : 'border border-[#B89352]/30 text-[#526157]'
                }`}
              >
                Toutes
              </button>
              {GALLERY_CHAPTERS.map((chapter) => (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === chapter.id}
                  onClick={() => setFilter(chapter.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                    filter === chapter.id ? 'bg-[#1B3B2B] text-[#FBF9F5]' : 'border border-[#B89352]/30 text-[#526157]'
                  }`}
                >
                  {chapter.title}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
              {visiblePhotos.map((photo, index) => (
                <motion.button
                  key={photo.id}
                  type="button"
                  onClick={() => openPhoto(photo)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className={`group relative overflow-hidden border border-[#B89352]/25 bg-[#F5EFE4] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] ${
                    index % 7 === 0
                      ? 'lg:col-span-7 aspect-[16/10]'
                      : index % 7 === 1
                      ? 'lg:col-span-5 aspect-[3/4]'
                      : 'lg:col-span-4 aspect-[4/5]'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    width="900"
                    height="1200"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {archiveStatus === 'available' && (
          <div className="mt-20 border-t border-[#B89352]/25 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl text-[#1B3B2B]">Emporter les souvenirs</p>
              <p className="mt-1 text-sm text-[#526157]">Téléchargez toutes les photographies dans une archive complète.</p>
            </div>
            <a
              href="/downloads/album-fiancailles.zip"
              download
              onClick={() => undefined}
              className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#1B3B2B] text-[#FBF9F5] text-xs uppercase tracking-[0.14em] hover:bg-[#12291E] transition-colors"
            >
              <Download className="w-4 h-4" /> Télécharger l’album complet
            </a>
          </div>
        )}
      </div>

      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse photographique"
          onClick={closeLightbox}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            touchStartX.current = null;
            if (start === null || end === undefined || Math.abs(end - start) < 48) return;
            end < start ? showNext() : showPrev();
          }}
          className="fixed inset-0 z-[70] bg-[#12291E]/96 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            aria-label="Fermer la visionneuse"
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center bg-[#FBF9F5] text-[#1B3B2B] z-20"
          >
            <X className="w-5 h-5" />
          </button>
          {visiblePhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showPrev();
                }}
                aria-label="Photographie précédente"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#FBF9F5]/95 text-[#1B3B2B] z-20"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  showNext();
                }}
                aria-label="Photographie suivante"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-[#FBF9F5]/95 text-[#1B3B2B] z-20"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div onClick={(event) => event.stopPropagation()} className="w-full max-w-5xl flex flex-col items-center">
            <img
              src={activePhoto.downloadSrc}
              alt={activePhoto.alt}
              draggable={false}
              className="max-h-[72vh] max-w-full w-auto object-contain bg-[#FFFDF9] p-1.5 border border-[#D4B87A]/40"
            />
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 text-[#FBF9F5]">
              <p className="text-xs uppercase tracking-[0.16em] text-[#D4B87A]">
                Photographie {(selectedIndex ?? 0) + 1} / {visiblePhotos.length}
              </p>
              {activePhoto.caption && <p className="text-sm">{activePhoto.caption}</p>}
              <button
                type="button"
                onClick={() => downloadPhoto(activePhoto)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4B87A]/70 text-xs uppercase tracking-[0.12em] hover:bg-[#FBF9F5] hover:text-[#1B3B2B] transition-colors"
              >
                <Download className="w-4 h-4" /> Télécharger
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
