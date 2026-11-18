import { useState } from 'react';
import { Flower2 } from 'lucide-react';

interface BotanicalCornerProps {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}

export function BotanicalSprig({
  className = '',
  flipX = false,
  flipY = false,
}: BotanicalCornerProps) {
  const transform = `${flipX ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`.trim() || undefined;
  return (
    <svg
      viewBox="0 0 180 140"
      fill="none"
      aria-hidden="true"
      className={className}
      style={transform ? { transform } : undefined}
    >
      {/* Delicate stem */}
      <path
        d="M14 126C44 96 76 68 134 32"
        stroke="#1B3B2B"
        strokeOpacity="0.45"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M52 91C78 88 104 94 128 104"
        stroke="#B89352"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Leaves in deep forest green */}
      <path
        d="M36 105C22 92 22 72 34 62C46 74 48 92 36 105Z"
        fill="#1B3B2B"
        fillOpacity="0.14"
        stroke="#1B3B2B"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <path
        d="M64 81C56 62 62 44 76 38C82 54 78 71 64 81Z"
        fill="#1B3B2B"
        fillOpacity="0.12"
        stroke="#1B3B2B"
        strokeOpacity="0.48"
        strokeWidth="1"
      />
      <path
        d="M93 60C90 42 98 26 113 22C116 38 109 53 93 60Z"
        fill="#1B3B2B"
        fillOpacity="0.14"
        stroke="#1B3B2B"
        strokeOpacity="0.48"
        strokeWidth="1"
      />
      <path
        d="M84 91C100 84 118 89 124 101C108 106 93 102 84 91Z"
        fill="#B89352"
        fillOpacity="0.18"
        stroke="#B89352"
        strokeOpacity="0.65"
        strokeWidth="1"
      />
      <path
        d="M126 37C134 25 148 18 162 20C156 34 142 42 126 37Z"
        fill="#1B3B2B"
        fillOpacity="0.12"
        stroke="#1B3B2B"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      {/* White garden blossom */}
      <g transform="translate(46 96)">
        <circle cx="0" cy="-10" r="8" fill="#FFFDF9" stroke="#B89352" strokeOpacity="0.6" strokeWidth="0.9" />
        <circle cx="9.5" cy="-3" r="8" fill="#FFFDF9" stroke="#B89352" strokeOpacity="0.6" strokeWidth="0.9" />
        <circle cx="6" cy="8" r="8" fill="#FFFDF9" stroke="#B89352" strokeOpacity="0.6" strokeWidth="0.9" />
        <circle cx="-6" cy="8" r="8" fill="#FFFDF9" stroke="#B89352" strokeOpacity="0.6" strokeWidth="0.9" />
        <circle cx="-9.5" cy="-3" r="8" fill="#FFFDF9" stroke="#B89352" strokeOpacity="0.6" strokeWidth="0.9" />
        <circle cx="0" cy="0" r="4.2" fill="#D4B87A" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

export function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#B89352]/70" />
      <svg viewBox="0 0 40 20" className="w-8 h-4 text-[#B89352]" fill="none">
        <path
          d="M20 2C22 6 26 9 32 10C26 11 22 14 20 18C18 14 14 11 8 10C14 9 18 6 20 2Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="currentColor"
          fillOpacity="0.16"
        />
        <circle cx="20" cy="10" r="1.8" fill="currentColor" />
      </svg>
      <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#B89352]/70" />
    </div>
  );
}

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export function EditorialImage({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  fallbackTitle = 'Clevy & Lorriane',
  loading = 'lazy',
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F5EFE4] border border-[#B89352]/30 text-[#1B3B2B] p-6 text-center ${className}`}
      >
        <Flower2 className="w-7 h-7 text-[#B89352] mb-2" strokeWidth={1.3} aria-hidden="true" />
        <p className="font-display italic text-lg">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#F5EFE4] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={imgClassName}
      />
    </div>
  );
}
