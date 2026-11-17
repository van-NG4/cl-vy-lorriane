import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, FileText, Maximize2, Share2, X } from 'lucide-react';
import { WEDDING_ASSETS, WEDDING_IDENTITY } from '../data/weddingData';
import { downloadInvitationImage, downloadInvitationPdf } from '../utils/downloads';
import { OrnamentalDivider } from './BotanicalOrnament';

type InvitationVersion = 'improved' | 'original';

export function InvitationSection() {
  const [version, setVersion] = useState<InvitationVersion>('improved');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingImg, setDownloadingImg] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  const activeInvitationSrc =
    version === 'improved' ? WEDDING_ASSETS.invitation : WEDDING_ASSETS.originalInvitation;

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen]);

  const handleDownloadPdf = async () => {
    setErrorMsg(null);
    setFeedback(null);
    setDownloadingPdf(true);
    try {
      await downloadInvitationPdf(activeInvitationSrc);
      setFeedback('Le fichier PDF de l’invitation a été téléchargé.');
    } catch {
      setErrorMsg('Impossible de générer le PDF. Veuillez réessayer.');
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadImage = async () => {
    setErrorMsg(null);
    setFeedback(null);
    setDownloadingImg(true);
    try {
      await downloadInvitationImage(activeInvitationSrc);
      setFeedback('L’image de l’invitation a été téléchargée.');
    } catch {
      setErrorMsg('Impossible de télécharger l’image. Veuillez réessayer.');
    } finally {
      setDownloadingImg(false);
    }
  };

  const handleShare = async () => {
    setErrorMsg(null);
    setFeedback(null);
    setSharing(true);
    try {
      const shareData = {
        title: 'Clery & Loriane — Invitation de mariage',
        text: `Retrouvez l’invitation au mariage de Clery & Loriane, les ${WEDDING_IDENTITY.datesLabel} à Brazzaville.`,
        url: window.location.href,
      };
      if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
        await navigator.share(shareData);
        setFeedback('L’invitation a été partagée.');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setFeedback('Le lien de l’invitation a été copié.');
      } else {
        throw new Error('Partage non disponible sur cet appareil.');
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
      setErrorMsg(error instanceof Error ? error.message : 'Impossible de partager l’invitation.');
    } finally {
      setSharing(false);
    }
  };

  return (
    <section id="invitation" className="py-20 sm:py-28 bg-[#FBF9F5] paper-texture">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* Left: Official Invitation Card — never distorted or cropped */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md bg-[#FFFDF9] p-4 sm:p-5 border border-[#B89352]/40">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Agrandir l'invitation officielle"
                className="group relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
              >
                <img
                  src={activeInvitationSrc}
                  alt="Invitation officielle du mariage — 27 et 28 février 2027 à Brazzaville"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain block"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-[#FBF9F5]/95 text-[#1B3B2B] border border-[#B89352]/50 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B89352]" aria-hidden="true" />
                  <span>Agrandir</span>
                </span>
              </button>
            </div>

            {/* Clean interactive selector between improved luxury card & original card */}
            <div
              role="tablist"
              aria-label="Choisir la version de l'invitation"
              className="mt-4 inline-flex items-center p-1 bg-[#F5EFE4] border border-[#B89352]/30"
            >
              <button
                type="button"
                role="tab"
                aria-selected={version === 'improved'}
                onClick={() => {
                  setVersion('improved');
                  setFeedback(null);
                  setErrorMsg(null);
                }}
                className={`px-4 py-1.5 text-xs uppercase tracking-[0.12em] whitespace-nowrap transition-colors ${
                  version === 'improved'
                    ? 'bg-[#1B3B2B] text-[#FBF9F5]'
                    : 'text-[#526157] hover:text-[#1B3B2B]'
                }`}
              >
                Édition améliorée
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={version === 'original'}
                onClick={() => {
                  setVersion('original');
                  setFeedback(null);
                  setErrorMsg(null);
                }}
                className={`px-4 py-1.5 text-xs uppercase tracking-[0.12em] whitespace-nowrap transition-colors ${
                  version === 'original'
                    ? 'bg-[#1B3B2B] text-[#FBF9F5]'
                    : 'text-[#526157] hover:text-[#1B3B2B]'
                }`}
              >
                Maquette originale
              </button>
            </div>
          </div>

          {/* Right: Editorial Copy & Real Downloads */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.24em] text-[#B89352]">
              Faire-part officiel
            </p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1B3B2B]">
              L’Invitation Officielle
            </h2>
            <div className="my-6 flex justify-center lg:justify-start">
              <OrnamentalDivider />
            </div>

            <p className="text-base sm:text-[17px] leading-[1.85] text-[#1D2B22] max-w-xl mx-auto lg:mx-0">
              C’est avec une immense joie que {WEDDING_IDENTITY.coupleNames} vous invitent à
              célébrer leur mariage les {WEDDING_IDENTITY.datesLabel} à{' '}
              {WEDDING_IDENTITY.locationFull}.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#526157] max-w-xl mx-auto lg:mx-0">
              Retrouvez la version imprimable sans bordures noires, avec votre photographie au
              centre, des finitions or champagne et des feuillages botaniques équilibrés. Cliquez
              sur la carte pour l’agrandir ou téléchargez-la en haute qualité.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs uppercase tracking-[0.16em] font-medium bg-[#1B3B2B] text-[#FBF9F5] hover:bg-[#12291E] disabled:opacity-60 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
              >
                <FileText className="w-4 h-4 text-[#D4B87A]" strokeWidth={1.6} aria-hidden="true" />
                <span>
                  {downloadingPdf ? 'Création du PDF…' : 'Télécharger l’invitation (PDF)'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleDownloadImage}
                disabled={downloadingImg}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs uppercase tracking-[0.16em] font-medium text-[#1B3B2B] bg-[#FFFDF9] border border-[#B89352]/70 hover:border-[#1B3B2B] hover:bg-[#F5EFE4] disabled:opacity-60 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
              >
                <Download className="w-4 h-4 text-[#B89352]" strokeWidth={1.6} aria-hidden="true" />
                <span>
                  {downloadingImg ? 'Téléchargement…' : 'Télécharger l’invitation (Image)'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                disabled={sharing}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 text-xs uppercase tracking-[0.16em] font-medium text-[#1B3B2B] bg-transparent border border-[#B89352]/50 hover:bg-[#F5EFE4] disabled:opacity-60 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
              >
                <Share2 className="w-4 h-4 text-[#B89352]" strokeWidth={1.6} aria-hidden="true" />
                <span>{sharing ? 'Préparation…' : 'Partager l’invitation'}</span>
              </button>
            </div>

            <div className="mt-4 min-h-[24px]">
              {feedback && (
                <p role="status" className="text-sm text-[#1B3B2B] font-medium">
                  {feedback}
                </p>
              )}
              {errorMsg && (
                <p role="alert" className="text-sm text-red-800">
                  {errorMsg}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox for Invitation */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi de l'invitation officielle"
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-[#12291E]/92 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Fermer l'aperçu"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center bg-[#FBF9F5] text-[#1B3B2B] hover:bg-[#F5EFE4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4B87A]"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full max-h-[88vh] flex flex-col items-center"
          >
            <img
              src={activeInvitationSrc}
              alt="Invitation officielle agrandie"
              referrerPolicy="no-referrer"
              className="max-h-[78vh] w-auto object-contain border border-[#D4B87A]/50 bg-[#FFFDF9] p-2"
            />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.14em] bg-[#FBF9F5] text-[#1B3B2B] hover:bg-[#F5EFE4]"
              >
                <FileText className="w-4 h-4 text-[#B89352]" aria-hidden="true" />
                <span>Télécharger PDF</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadImage}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.14em] border border-[#D4B87A] text-[#FBF9F5] hover:bg-[#1B3B2B]"
              >
                <Download className="w-4 h-4 text-[#D4B87A]" aria-hidden="true" />
                <span>Télécharger Image</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
