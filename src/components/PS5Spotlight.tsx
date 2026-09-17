import React from 'react';
import type { Game, BacklogStatus } from '../types/game';
import { PlatformIcons } from './PlatformIcons';
import { CriticScore } from './CriticScore';
import { Info, Play, Clock, Check, Star } from 'lucide-react';


interface Props {
  game: Game;
  userStatus?: BacklogStatus | null;
  onOpenDetails: (game: Game) => void;
  onUpdateStatus: (game: Game, status: BacklogStatus | null) => void;
}

export const PS5Spotlight: React.FC<Props> = ({
  game,
  userStatus,
  onOpenDetails,
  onUpdateStatus,
}) => {
  const releaseYear = game.released ? new Date(game.released).getFullYear() : null;

  return (
    <div className="pt-4 sm:pt-14 pb-4 sm:pb-10 max-w-3xl animate-fadeIn">
      <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3 flex-wrap">
        <PlatformIcons platforms={game.parent_platforms} />
        <CriticScore score={game.metacritic} />

        {game.rating > 0 && (
          <span className="flex items-center gap-1 text-xs font-semibold text-amber-400 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{game.rating.toFixed(1)}</span>
          </span>
        )}

        {releaseYear && (
          <span className="text-xs text-zinc-400 font-medium">
            {releaseYear}
          </span>
        )}

        {game.playtime > 0 && (
          <span className="text-xs text-zinc-400 font-medium">
            ~{game.playtime} ч.
          </span>
        )}
      </div>

      <h1 className="text-2xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none drop-shadow-md">
        {game.name}
      </h1>

      <p className="text-xs sm:text-sm md:text-base text-zinc-300/90 mt-2.5 sm:mt-4 leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal max-w-2xl drop-shadow">
        {game.description_raw ||
          `${game.name} — захватывающее приключение с проработанным миром и динамичным геймплеем.`}
      </p>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mt-4 sm:mt-6">
        <button
          type="button"
          onClick={() => onOpenDetails(game)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all hover:scale-103 shadow-lg shadow-white/10 active:scale-95"
        >
          <Info className="w-4 h-4" />
          <span>Подробнее об игре</span>
        </button>

        <div className="inline-flex items-center justify-between sm:justify-start gap-1 p-1 rounded-xl bg-black/50 backdrop-blur-md border border-white/10">
          <button
            type="button"
            onClick={() => onUpdateStatus(game, userStatus === 'playing' ? null : 'playing')}
            className={`flex-1 sm:flex-initial justify-center px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              userStatus === 'playing'
                ? 'bg-emerald-500 text-zinc-950'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{userStatus === 'playing' ? 'Играю' : 'Играть'}</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateStatus(game, userStatus === 'backlog' ? null : 'backlog')}
            className={`flex-1 sm:flex-initial justify-center px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              userStatus === 'backlog'
                ? 'bg-amber-500 text-zinc-950'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>В планы</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateStatus(game, userStatus === 'completed' ? null : 'completed')}
            className={`flex-1 sm:flex-initial justify-center px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              userStatus === 'completed'
                ? 'bg-blue-500 text-zinc-950'
                : 'text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Пройдено</span>
          </button>
        </div>
      </div>
    </div>
  );
};
