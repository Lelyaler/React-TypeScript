import React from 'react';
import type { Game } from '../../types/game';
import type { UserPcSpecs } from '../../types/pcSpecs';
import { evaluatePcCompatibility } from '../../utils/pcCompatibility';
import { Laptop } from 'lucide-react';

interface GameSpecsTabProps {
  game: Game;
  userPcSpecs?: UserPcSpecs;
  onOpenPcSpecs?: () => void;
}

export const GameSpecsTab: React.FC<GameSpecsTabProps> = ({
  game,
  userPcSpecs,
  onOpenPcSpecs,
}) => {
  if (!game.pc_requirements) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      {userPcSpecs && (
        <div className="md:col-span-2 p-4 rounded-2xl bg-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-white">Профиль конфигурации: {userPcSpecs.name}</span>
                {(() => {
                  const res = evaluatePcCompatibility(game, userPcSpecs);
                  return (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${res.bgClass} ${res.textClass}`}>
                      {res.badgeText}
                    </span>
                  );
                })()}
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                {userPcSpecs.gpuName} • {userPcSpecs.cpuName} • {userPcSpecs.ramGb} GB RAM
              </p>
            </div>
          </div>
          {onOpenPcSpecs && (
            <button
              type="button"
              onClick={onOpenPcSpecs}
              className="px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-all shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
            >
              Сменить профиль
            </button>
          )}
        </div>
      )}

      {game.pc_requirements.minimum && (
        <div className="p-5 rounded-2xl bg-zinc-800/40 space-y-2.5 shadow-sm">
          <h4 className="font-bold text-zinc-200 text-sm">
            Минимальные требования
          </h4>
          <p className="text-zinc-400 leading-relaxed font-mono text-xs whitespace-pre-line">
            {game.pc_requirements.minimum.replace(/<[^>]*>?/gm, ' ')}
          </p>
        </div>
      )}

      {game.pc_requirements.recommended && (
        <div className="p-5 rounded-2xl bg-zinc-800/40 space-y-2.5 shadow-sm">
          <h4 className="font-bold text-emerald-300 text-sm">
            Рекомендуемые требования
          </h4>
          <p className="text-zinc-400 leading-relaxed font-mono text-xs whitespace-pre-line">
            {game.pc_requirements.recommended.replace(/<[^>]*>?/gm, ' ')}
          </p>
        </div>
      )}
    </div>
  );
};
