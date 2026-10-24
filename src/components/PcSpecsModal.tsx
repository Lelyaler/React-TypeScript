import React, { useState } from 'react';
import { X, Cpu, Check, Laptop, Sparkles, Sliders } from 'lucide-react';
import { type UserPcSpecs, type PcPreset, PC_PRESETS } from '../types/pcSpecs';
import { evaluatePcCompatibility, saveStoredPcSpecs } from '../utils/pcCompatibility';
import type { Game } from '../types/game';
import { sounds } from '../utils/soundEffects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  specs: UserPcSpecs;
  onUpdateSpecs: (specs: UserPcSpecs) => void;
  currentGame?: Game | null;
}

export const PcSpecsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  specs,
  onUpdateSpecs,
  currentGame,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PcPreset>(specs.preset);
  const [customSpecs, setCustomSpecs] = useState<UserPcSpecs>(specs);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: PcPreset) => {
    sounds.playSelect();
    setSelectedPreset(preset);
    if (preset !== 'custom') {
      const newSpecs = PC_PRESETS[preset];
      setCustomSpecs(newSpecs);
      onUpdateSpecs(newSpecs);
      saveStoredPcSpecs(newSpecs);
    }
  };

  const handleCustomChange = (field: keyof UserPcSpecs, value: number | string) => {
    sounds.playNav();
    const updated: UserPcSpecs = {
      ...customSpecs,
      preset: 'custom',
      [field]: value,
    };
    if (field === 'gpuTier') {
      const gNames: Record<number, string> = {
        1: 'Встроенная графика Intel/AMD',
        2: 'GeForce GTX 1050 Ti / RX 560 (4GB)',
        3: 'GeForce GTX 1660 / RTX 3050 (6-8GB)',
        4: 'GeForce RTX 3060 / RTX 4060 (8-12GB)',
        5: 'GeForce RTX 4080 / RTX 4090 (16GB+)',
      };
      updated.gpuName = gNames[value as number] || 'Дискретная видеокарта';
    }
    if (field === 'cpuTier') {
      const cNames: Record<number, string> = {
        1: '2-ядерный процессор',
        2: '4-ядерный Core i3 / Ryzen 3',
        3: '6-ядерный Core i5 / Ryzen 5 3600',
        4: 'Современный 6-8 ядерный Ryzen 5600 / i5 12400',
        5: 'Топовый Ryzen 7 7800X3D / Core i7-14700K',
      };
      updated.cpuName = cNames[value as number] || 'Многоядерный процессор';
    }
    setSelectedPreset('custom');
    setCustomSpecs(updated);
    onUpdateSpecs(updated);
    saveStoredPcSpecs(updated);
  };

  const currentResult = currentGame ? evaluatePcCompatibility(currentGame, customSpecs) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-zinc-900/95 rounded-2xl shadow-2xl p-5 sm:p-7 overflow-hidden text-zinc-100 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Технические спецификации и требования
            </h2>
            <p className="text-xs text-zinc-400">
              Профиль конфигурации оборудования для оценки производительности в играх
            </p>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['budget', 'medium', 'high', 'ultra'] as const).map((key) => {
            const p = PC_PRESETS[key];
            const isSelected = selectedPreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelectPreset(key)}
                className={`p-3 rounded-xl text-left transition-all relative ${
                  isSelected
                    ? 'bg-white text-zinc-950 font-bold shadow-lg scale-102'
                    : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Laptop className={`w-4 h-4 ${isSelected ? 'text-zinc-950' : 'text-zinc-400'}`} />
                  {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                </div>
                <div className="text-xs mt-2 font-semibold truncate">{p.name}</div>
                <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-zinc-700' : 'text-zinc-400'}`}>
                  {p.ramGb} GB • Tier {p.gpuTier}
                </div>
              </button>
            );
          })}
        </div>

        {/* Specs Details Card */}
        <div className="mt-4 p-4 rounded-xl bg-zinc-950/60 shadow-inner">
          <div className="text-xs font-semibold text-zinc-400 mb-2.5 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Текущие параметры вашей системы</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Видеокарта (GPU):</span>
                <span className="text-white font-medium truncate max-w-[280px]">{customSpecs.gpuName}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={customSpecs.gpuTier}
                onChange={(e) => handleCustomChange('gpuTier', parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Процессор (CPU):</span>
                <span className="text-white font-medium truncate max-w-[280px]">{customSpecs.cpuName}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={customSpecs.cpuTier}
                onChange={(e) => handleCustomChange('cpuTier', parseInt(e.target.value, 10))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Оперативная память (RAM):</span>
                <span className="text-white font-medium">{customSpecs.ramGb} GB RAM</span>
              </div>
              <div className="flex gap-2">
                {[8, 16, 32, 64].map((ram) => (
                  <button
                    key={ram}
                    type="button"
                    onClick={() => handleCustomChange('ramGb', ram)}
                    className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all ${
                      customSpecs.ramGb === ram
                        ? 'bg-emerald-500 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {ram} GB
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Compatibility Check with currentGame */}
        {currentGame && currentResult && (
          <div className="mt-4 p-4 rounded-xl bg-zinc-950/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-400">Проверка для: <strong className="text-white">{currentGame.name}</strong></span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${currentResult.bgClass} ${currentResult.textClass}`}>
                {currentResult.badgeText}
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-2">
              {currentResult.summary}
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2">
              <div>
                <span className="text-zinc-500">Ожидаемый FPS: </span>
                <span className="text-white font-semibold">{currentResult.fpsEstimate}</span>
              </div>
              <div>
                <span className="text-zinc-500">Графика: </span>
                <span className="text-white font-semibold">{currentResult.settingsEstimate}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => {
              sounds.playSelect();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Готово</span>
          </button>
        </div>
      </div>
    </div>
  );
};
