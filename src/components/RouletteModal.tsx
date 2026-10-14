import React, { useState } from 'react';
import type { Game } from '../types/game';
import { CriticScore } from './CriticScore';
import { X, Shuffle, ArrowRight, RotateCw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export const RouletteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  games,
  onSelectGame,
}) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(false);

  const pickRandom = (items: Game[]) => {
    if (!items.length) return null;
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  if (isOpen && !prevIsOpen) {
    setPrevIsOpen(true);
    setSelectedGame(pickRandom(games));
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }

  const handleNext = () => {
    sounds.playNav();
    const otherGames = games.filter((g) => g.id !== selectedGame?.id);
    const nextGame = pickRandom(otherGames.length ? otherGames : games);
    setSelectedGame(nextGame);
  };

  const handleClose = () => {
    sounds.playBack();
    onClose();
  };

  if (!isOpen || !selectedGame) return null;

  const releaseYear = selectedGame.released ? new Date(selectedGame.released).getFullYear() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl shadow-black z-10 flex flex-col p-5 sm:p-6 text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-200 flex items-center justify-center">
              <Shuffle className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                Случайная игра
              </h3>
              <p className="text-[11px] text-zinc-400">
                Рекомендация из каталога
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 shadow-md mb-4 group cursor-pointer"
             onClick={() => {
               sounds.playSelect();
               onSelectGame(selectedGame);
               onClose();
             }}
        >
          <img
            src={selectedGame.background_image}
            alt={selectedGame.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

          <div className="absolute bottom-3 inset-x-3 flex items-end justify-between">
            <div className="space-y-1 max-w-[80%]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <CriticScore score={selectedGame.metacritic} />
                {selectedGame.genres?.[0] && (
                  <span className="text-[10px] font-medium text-zinc-300 bg-zinc-900/90 px-1.5 py-0.5 rounded">
                    {selectedGame.genres[0].name}
                  </span>
                )}
                {releaseYear && (
                  <span className="text-[10px] text-zinc-400">
                    {releaseYear}
                  </span>
                )}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white leading-tight line-clamp-1">
                {selectedGame.name}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors shadow-sm"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Другой вариант</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              onSelectGame(selectedGame);
              onClose();
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <span>Перейти к игре</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
