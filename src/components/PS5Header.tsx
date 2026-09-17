import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Dices, Bookmark, Gamepad2, Settings, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  activeTab: 'catalog' | 'library';
  onSelectTab: (tab: 'catalog' | 'library') => void;
  searchText: string;
  onSearch: (text: string) => void;
  onOpenRoulette: () => void;
  onOpenSettings: () => void;
  libraryCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isGamepadConnected?: boolean;
  gamepadName?: string;
}

export const PS5Header: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  searchText,
  onSearch,
  onOpenRoulette,
  onOpenSettings,
  libraryCount,
  soundEnabled,
  onToggleSound,
  isGamepadConnected = false,
  gamepadName = '',
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement !== searchInputRef.current &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="relative z-30 px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
      <div className="flex items-center gap-2 sm:gap-6">
        <div
          onClick={() => {
            sounds.playSelect();
            onSelectTab('catalog');
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all">
            <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white hidden sm:inline">
            GameVault
          </span>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              onSelectTab('catalog');
            }}
            className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'catalog'
                ? 'bg-white text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Игры
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              onSelectTab('library');
            }}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'library'
                ? 'bg-white text-zinc-950 shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Библиотека</span>
            {libraryCount > 0 && (
              <span className="text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-300">
                {libraryCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              onOpenRoulette();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-amber-300 hover:text-white hover:bg-white/10 transition-all"
            title="Случайная игра"
          >
            <Dices className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Рулетка</span>
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        {isGamepadConnected && (
          <div
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-tight animate-fadeIn"
            title={`Контроллер активен: ${gamepadName || 'Геймпад'}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <Gamepad2 className="w-3.5 h-3.5" />
            <span className="truncate max-w-[120px]">{gamepadName || 'Контроллер'}</span>
          </div>
        )}

        <div className="relative flex items-center">
          <Search className="absolute left-2.5 sm:left-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Поиск..."
            className="w-24 focus:w-36 sm:w-60 sm:focus:w-60 bg-black/40 hover:bg-black/60 focus:bg-black/80 border border-white/10 focus:border-white/40 text-xs sm:text-sm text-white placeholder-zinc-400 rounded-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 transition-all duration-300 outline-none backdrop-blur-md"
          />
          {searchText && (
            <button
              type="button"
              onClick={() => onSearch('')}
              className="absolute right-2 sm:right-2.5 text-zinc-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onToggleSound}
          className={`p-1.5 sm:p-2 rounded-full transition-colors ${
            soundEnabled
              ? 'text-zinc-300 hover:text-white hover:bg-white/10'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
          }`}
          title={soundEnabled ? 'Звуковые эффекты: включены' : 'Звуковые эффекты: выключены'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {time && (
          <div className="hidden sm:block text-xs font-mono font-semibold text-zinc-300 bg-white/5 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5">
            {time}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            sounds.playSelect();
            onOpenSettings();
          }}
          className="p-1.5 sm:p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title="Настройки API"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
