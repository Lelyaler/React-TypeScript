import React, { useRef, useEffect } from 'react';
import type { Game, BacklogStatus } from '../types/game';
import { ChevronLeft, ChevronRight, Bookmark, Play, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  games: Game[];
  activeGameId: number;
  onHoverGame: (game: Game) => void;
  onSelectGame: (game: Game) => void;
  getStatus: (gameId: number) => BacklogStatus | null;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';

export const PS5GameShelf: React.FC<Props> = ({
  games,
  activeGameId,
  onHoverGame,
  onSelectGame,
  getStatus,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeGameId]);

  const scroll = (direction: 'left' | 'right') => {
    sounds.playNav();
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/shelf mt-auto pt-2 sm:pt-4 pb-4 sm:pb-8">
      <button
        type="button"
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white text-zinc-300 hover:text-zinc-950 items-center justify-center backdrop-blur-md opacity-0 group-hover/shelf:opacity-100 transition-all shadow-xl"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white text-zinc-300 hover:text-zinc-950 items-center justify-center backdrop-blur-md opacity-0 group-hover/shelf:opacity-100 transition-all shadow-xl"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-3 sm:py-4 px-1 sm:px-2 scroll-smooth snap-x snap-mandatory touch-pan-x overscroll-x-contain"
      >
        {games.map((game) => {
          const isActive = game.id === activeGameId;
          const status = getStatus(game.id);

          return (
            <div
              key={game.id}
              ref={isActive ? activeCardRef : undefined}
              onMouseEnter={() => {
                if (!isActive) sounds.playNav();
                onHoverGame(game);
              }}
              onClick={() => {
                sounds.playSelect();
                onHoverGame(game);
                onSelectGame(game);
              }}
              className={`relative shrink-0 w-32 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 select-none snap-start ${
                isActive
                  ? 'ring-2 sm:ring-3 ring-white scale-103 sm:scale-105 shadow-[0_15px_40px_rgba(0,0,0,0.8)] -translate-y-1 sm:-translate-y-2 z-10'
                  : 'opacity-75 sm:opacity-70 hover:opacity-100 hover:scale-102 hover:-translate-y-1'
              }`}
            >
              <img
                src={game.background_image || FALLBACK_IMAGE}
                alt={game.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {status && (
                <div className="absolute top-2 left-2 p-1 rounded-md bg-black/60 backdrop-blur-md">
                  {status === 'playing' ? (
                    <Play className="w-3 h-3 text-emerald-400 fill-current" />
                  ) : status === 'completed' ? (
                    <Check className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Bookmark className="w-3 h-3 text-amber-400 fill-current" />
                  )}
                </div>
              )}

              <div className="absolute bottom-2.5 inset-x-2.5">
                <p className="text-[11px] sm:text-xs font-bold text-white leading-snug line-clamp-1 drop-shadow">
                  {game.name}
                </p>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-zinc-400 mt-0.5">
                  <span>{game.genres?.[0]?.name}</span>
                  {game.metacritic && (
                    <span className="font-mono font-bold text-white">
                      {game.metacritic}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
