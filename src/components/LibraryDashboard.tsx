import React from 'react';
import type { BacklogStatus } from '../types/game';
import { Play, Clock, Check, Layers, Timer, Share2, Download } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  stats: {
    total: number;
    playing: number;
    backlog: number;
    completed: number;
    totalPlaytime: number;
  };
  activeTab: BacklogStatus | 'all';
  onSelectTab: (tab: BacklogStatus | 'all') => void;
  onShareLibrary?: () => void;
  onExportJson?: () => void;
}

export const LibraryDashboard: React.FC<Props> = ({
  stats,
  activeTab,
  onSelectTab,
  onShareLibrary,
  onExportJson,
}) => {
  return (
    <div className="space-y-5 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Моя библиотека
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Ваш персональный игровой трекер и бэклог
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              onShareLibrary?.();
            }}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            title="Скопировать ссылку на библиотеку"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Поделиться</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              onExportJson?.();
            }}
            disabled={stats.total === 0}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-medium bg-white/[0.05] hover:bg-white/10 text-zinc-300 hover:text-white transition-colors disabled:opacity-40"
            title="Скачать список в формате JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Экспорт JSON</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-zinc-400">Всего игр</div>
            <div className="text-sm sm:text-base font-bold text-white">{stats.total}</div>
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
            <Play className="w-4 h-4 fill-current" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-zinc-400">Играю сейчас</div>
            <div className="text-sm sm:text-base font-bold text-emerald-300">{stats.playing}</div>
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-zinc-400">Пройдено</div>
            <div className="text-sm sm:text-base font-bold text-blue-300">{stats.completed}</div>
          </div>
        </div>

        <div className="bg-white/[0.03] rounded-xl p-3 flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] sm:text-[11px] text-zinc-400">Время в играх</div>
            <div className="text-sm sm:text-base font-bold text-purple-300">~{stats.totalPlaytime} ч</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 border-b border-white/[0.06] pb-3 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => {
            sounds.playNav();
            onSelectTab('all');
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'bg-white text-zinc-950 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
          }`}
        >
          Все ({stats.total})
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playNav();
            onSelectTab('playing');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'playing'
              ? 'bg-emerald-500 text-zinc-950 font-semibold'
              : 'text-zinc-400 hover:text-emerald-300 hover:bg-white/[0.04]'
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
          <span>Играю ({stats.playing})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playNav();
            onSelectTab('backlog');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'backlog'
              ? 'bg-amber-500 text-zinc-950 font-semibold'
              : 'text-zinc-400 hover:text-amber-300 hover:bg-white/[0.04]'
          }`}
        >
          <Clock className="w-3 h-3" />
          <span>В планы ({stats.backlog})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playNav();
            onSelectTab('completed');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            activeTab === 'completed'
              ? 'bg-blue-500 text-zinc-950 font-semibold'
              : 'text-zinc-400 hover:text-blue-300 hover:bg-white/[0.04]'
          }`}
        >
          <Check className="w-3 h-3" />
          <span>Пройдено ({stats.completed})</span>
        </button>
      </div>
    </div>
  );
};
