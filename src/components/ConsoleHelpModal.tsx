import React from 'react';
import { X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsoleHelpModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    sounds.playBack();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-lg bg-zinc-900 rounded-2xl shadow-2xl shadow-black z-10 p-5 sm:p-6 space-y-5 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Консольное управление
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Поддержка горячих клавиш и официальных геймпадов
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 mb-2">
              Клавиатура
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Навигация по полке</span>
                <span className="font-mono font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded">← / →</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Открыть карточку</span>
                <span className="font-mono font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded">Enter</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Быстрый поиск</span>
                <span className="font-mono font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded">/</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Закрыть окно</span>
                <span className="font-mono font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded">Esc</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Вкл / Выкл звук</span>
                <span className="font-mono font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded">M</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Справка управления</span>
                <span className="font-mono font-bold text-zinc-200 bg-zinc-800 px-2 py-0.5 rounded">?</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 mb-2">
              Геймпад (DualSense / Xbox)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Выбор игры</span>
                <span className="font-medium text-emerald-400">D-Pad / Стики</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Подтвердить</span>
                <span className="font-medium text-emerald-400">✕ / A</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Назад / Закрыть</span>
                <span className="font-medium text-rose-400">◯ / B</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Смена статуса</span>
                <span className="font-medium text-sky-400">□ / X</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Случайная игра</span>
                <span className="font-medium text-amber-400">△ / Y</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/40">
                <span className="text-zinc-300">Аудио-отклик</span>
                <span className="font-medium text-purple-400">Web Audio FX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
