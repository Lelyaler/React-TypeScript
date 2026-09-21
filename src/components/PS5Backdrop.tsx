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
  const desktopBg = isWitcher
    ? `${base}images/backdrops/witcher-3.webp`
    : activeGame.short_screenshots?.[0]?.image || activeGame.background_image;
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
          width={1280}
          height={720}
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.75] contrast-[1.05]"
          style={{
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </picture>

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 via-40% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent sm:w-3/4" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050608]/80 to-transparent" />
    </div>
  );
};
