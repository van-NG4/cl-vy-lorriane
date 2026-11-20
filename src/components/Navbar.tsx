import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#histoire', label: 'Notre histoire' },
  { href: '#rendez-vous', label: 'Rendez-vous' },
  { href: '#invitation', label: 'Invitation' },
  { href: '#programme', label: 'Programme' },
  { href: '#galerie', label: 'Galerie' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#D96B32]/25'
          : 'bg-[#FFFDF9]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#accueil"
          className="font-display text-2xl sm:text-[26px] font-medium tracking-tight text-[#432B24] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D96B32]/50 rounded"
        >
          Clevy &amp; Lorriane
        </a>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-7 text-sm text-[#526157]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:text-[#1B3B2B] hover:border-[#B89352] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]/50 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#rsvp"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-[0.14em] font-medium text-[#FBF9F5] bg-[#1B3B2B] hover:bg-[#12291E] border border-[#1B3B2B] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89352]"
          >
            Confirmer ma présence
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#1B3B2B] hover:bg-[#F5EFE4] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-[#FBF9F5] border-t border-[#B89352]/20 px-6 py-6 shadow-sm"
        >
          <nav aria-label="Navigation mobile" className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="py-3 px-2 text-base font-display text-[#1B3B2B] border-b border-[#B89352]/15 hover:text-[#B89352] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rsvp"
              onClick={handleLinkClick}
              className="mt-4 inline-flex items-center justify-center w-full py-3.5 px-6 text-xs uppercase tracking-[0.16em] font-medium text-[#FBF9F5] bg-[#1B3B2B] hover:bg-[#12291E] transition-colors"
            >
              Confirmer ma présence
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
