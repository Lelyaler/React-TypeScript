import React from 'react';
import type { Game } from '../types/game';

interface Props {
  activeGame: Game | null;
}

export const PS5Backdrop: React.FC<Props> = ({ activeGame }) => {
  if (!activeGame) return null;

  const bgImage =
    activeGame.slug === 'the-witcher-3-wild-hunt'
      ? 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ss_112b1e176c1bd271d8a565eacb6feaf90f240bb2.1920x1080.jpg'
      : activeGame.short_screenshots?.[0]?.image || activeGame.background_image;

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#050608]">
      <img
        key={activeGame.id}
        src={bgImage}
        alt=""
        className="w-full h-full object-cover object-center animate-fadeIn scale-105 filter brightness-[0.75] contrast-[1.05]"
        style={{
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 via-40% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/90 via-[#050608]/50 to-transparent sm:w-3/4" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050608]/80 to-transparent" />
    </div>
  );
};
