import React, { useState, useEffect, useCallback } from 'react';
import type { Game } from '../types/game';
import { CriticScore } from './CriticScore';
import { PlatformIcons } from './PlatformIcons';
import { X, ArrowRight, RotateCw, Star, Clock, Dices, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  games: Game[];
  onSelectGame: (game: Game) => void;
}

const pickRandom = (items: Game[]): Game | null => {
  if (!items.length) return null;
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex] ?? null;
};

export const RouletteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  games,
  onSelectGame,
}) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(() => pickRandom(games));
  const [isSpinning, setIsSpinning] = useState(false);

  const handleNext = useCallback(() => {
    sounds.playNav();
    setIsSpinning(true);
    setTimeout(() => {
      const otherGames = games.filter((g) => g.id !== selectedGame?.id);
      const nextGame = pickRandom(otherGames.length ? otherGames : games);
      setSelectedGame(nextGame);
      setIsSpinning(false);
    }, 120);
  }, [games, selectedGame]);

  const handleSelect = useCallback(() => {
    if (selectedGame) {
      sounds.playSelect();
      onSelectGame(selectedGame);
      onClose();
    }
  }, [selectedGame, onSelectGame, onClose]);

  const handleClose = useCallback(() => {
    sounds.playBack();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handleSelect]);

  if (!isOpen || !selectedGame) return null;

  const releaseYear = selectedGame.released ? new Date(selectedGame.released).getFullYear() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-4xl bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] z-10 flex flex-col text-left transition-all">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Dices className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
                  Случайная игра
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                  <Sparkles className="w-2.5 h-2.5" />
                  Рулетка
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Случайный хит из вашей коллекции и каталога
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Закрыть (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero image and game details */}
        <div className="p-5 sm:p-8 space-y-6">
          <div
            className={`relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-zinc-950 shadow-2xl group cursor-pointer transition-all duration-300 ${
              isSpinning ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
            }`}
            onClick={handleSelect}
            title="Нажмите, чтобы открыть страницу игры"
          >
            <img
              src={selectedGame.backdrop_image || selectedGame.background_image}
              alt={selectedGame.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Badges on top */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <CriticScore score={selectedGame.metacritic} />
                {selectedGame.rating > 0 && (
                  <div className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{selectedGame.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              {selectedGame.playtime ? (
                <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-semibold text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>~{selectedGame.playtime} ч.</span>
                </div>
              ) : null}
            </div>

            {/* Title and summary on bottom */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 space-y-2">
              <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-300">
                <PlatformIcons platforms={selectedGame.parent_platforms} />
                {releaseYear && (
                  <span className="font-semibold text-zinc-400 bg-black/40 px-2 py-0.5 rounded">
                    {releaseYear}
                  </span>
                )}
                {selectedGame.genres?.map((g) => (
                  <span key={g.id} className="font-semibold bg-white/10 backdrop-blur-md px-2 py-0.5 rounded text-zinc-200">
                    {g.name}
                  </span>
                ))}
              </div>

              <h4 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-lg tracking-tight">
                {selectedGame.name}
              </h4>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-bold transition-all shadow-md active:scale-98"
            >
              <RotateCw className={`w-4 h-4 text-blue-400 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>Другой вариант</span>
              <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-zinc-900 text-zinc-400 rounded">
                Пробел
              </kbd>
            </button>

            <button
              type="button"
              onClick={handleSelect}
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white text-zinc-950 text-sm font-black hover:bg-zinc-100 transition-all shadow-xl shadow-white/10 active:scale-98"
            >
              <span>Перейти к игре</span>
              <ArrowRight className="w-4 h-4" />
              <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-zinc-200 text-zinc-700 rounded">
                Enter
              </kbd>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
