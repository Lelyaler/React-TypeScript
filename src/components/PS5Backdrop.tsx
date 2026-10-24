import React from 'react';
import type { Game } from '../types/game';

interface Props {
  activeGame: Game | null;
}

export const PS5Backdrop: React.FC<Props> = ({ activeGame }) => {
  if (!activeGame) return null;

  const base = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL)
    ? (import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`)
    : '/';

  const isWitcher = activeGame.slug === 'the-witcher-3-wild-hunt';
  const desktopBg = activeGame.backdrop_image ||
    (isWitcher ? `${base}images/backdrops/witcher-3.webp` : null) ||
    activeGame.short_screenshots?.[0]?.image ||
    activeGame.background_image;
  const mobileBg = isWitcher
    ? `${base}images/backdrops/witcher-3-mobile.webp`
    : desktopBg;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#050608]">
      <picture key={activeGame.id}>
        {isWitcher && (
          <source
            media="(max-width: 768px)"
            srcSet={mobileBg}
            type="image/webp"
            width={640}
            height={360}
          />
        )}
        <img
          src={desktopBg}
          alt=""
          fetchPriority="high"
          decoding="async"
          width={1376}
          height={768}
          className="w-full h-full object-cover object-center scale-102 filter brightness-[0.88] contrast-[1.06] saturate-[1.04]"
          style={{
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </picture>

      {/* Atmospheric lighting layers */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/75 via-45% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/80 via-[#050608]/35 via-30% to-transparent sm:w-3/5" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050608]/80 to-transparent" />
      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_65%,#050608_100%)] opacity-70" />
    </div>
  );
};
