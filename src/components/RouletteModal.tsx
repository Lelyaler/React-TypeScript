import React, { useState } from 'react';
import type { Game } from '../types/game';
import { CriticScore } from './CriticScore';
import { X, Dices, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
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
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [displayGame, setDisplayGame] = useState<Game | null>(null);

  const activeDisplayGame = displayGame || (games.length > 0 ? games[0] : null);

  const handleClose = () => {
    sounds.playBack();
    onClose();
  };

  if (!isOpen) return null;

  const handleSpin = () => {
    if (games.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setSelectedGame(null);
    sounds.playSelect();

    let speed = 60;
    let counter = 0;
    const totalSpins = 28 + Math.floor(Math.random() * 10);
    const candidateGames = [...games].sort(() => 0.5 - Math.random());

    const step = () => {
      counter++;
      const current = candidateGames[counter % candidateGames.length];
      setDisplayGame(current);
      sounds.playRouletteTick();

      if (counter < totalSpins) {
        speed += 12;
        setTimeout(step, speed);
      } else {
        setIsSpinning(false);
        setSelectedGame(current);
        sounds.playWin();
      }
    };

    step();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={isSpinning ? undefined : handleClose} />

      <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col p-4 sm:p-6 text-center">
        {!isSpinning && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 mx-auto mb-2.5 sm:mb-3 text-white">
          <Dices className="w-5 h-5" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          Рулетка: Во что поиграть?
        </h3>
        <p className="text-xs text-zinc-400 mt-0.5 mb-4 sm:mb-5">
          Не знаешь, что выбрать? Доверь выбор рандомайзеру GameVault
        </p>

        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-zinc-950 shadow-inner mb-4 sm:mb-5">
          {activeDisplayGame ? (
            <>
              <img
                src={activeDisplayGame.background_image}
                alt={activeDisplayGame.name}
                className={`w-full h-full object-cover transition-transform duration-200 ${
                  isSpinning ? 'scale-105 blur-[1px]' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

              <div className="absolute bottom-3 inset-x-3 flex items-end justify-between text-left">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <CriticScore score={activeDisplayGame.metacritic} />
                    {activeDisplayGame.genres?.[0] && (
                      <span className="text-[10px] text-zinc-300 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded">
                        {activeDisplayGame.genres[0].name}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight line-clamp-1">
                    {activeDisplayGame.name}
                  </h4>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-600 text-xs">
              Нажмите «Крутить рулетку»
            </div>
          )}

          {isSpinning && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="text-xs uppercase tracking-widest font-mono font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                Выбираем...
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 justify-center">
          {selectedGame ? (
            <>
              <button
                type="button"
                onClick={handleSpin}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ещё раз</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sounds.playSelect();
                  onSelectGame(selectedGame);
                  onClose();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-lg bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Открыть игру</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              disabled={isSpinning}
              onClick={handleSpin}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all disabled:opacity-50"
            >
              <Dices className="w-4 h-4" />
              <span>{isSpinning ? 'Крутим...' : 'Крутить рулетку!'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
