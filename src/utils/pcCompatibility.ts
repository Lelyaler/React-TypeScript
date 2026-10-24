import type { Game } from '../types/game';
import { type UserPcSpecs, type CompatibilityResult, PC_PRESETS } from '../types/pcSpecs';

export { PC_PRESETS };

const STORAGE_KEY = 'gamevault_pc_specs';

export function getStoredPcSpecs(): UserPcSpecs {
  if (typeof window === 'undefined') return PC_PRESETS.high;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }
  return PC_PRESETS.high;
}

export function saveStoredPcSpecs(specs: UserPcSpecs): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specs));
  } catch {
    // ignore
  }
}

// Game demand profiles: 3 = extreme, 2 = medium, 1 = light
function getGameDemandLevel(game: Game): 1 | 2 | 3 {
  const slug = game.slug;

  const extremeSlugs = [
    'alan-wake-2',
    'cyberpunk-2077',
    'god-of-war-ragnarok',
    'the-last-of-us-part-i',
    'death-stranding',
  ];

  const lightSlugs = [
    'portal-2',
    'hollow-knight',
    'hades',
    'signalis',
    'grand-theft-auto-v',
  ];

  if (extremeSlugs.includes(slug)) return 3;
  if (lightSlugs.includes(slug)) return 1;
  return 2;
}

export function evaluatePcCompatibility(game: Game, specs: UserPcSpecs): CompatibilityResult {
  const demand = getGameDemandLevel(game);
  const effectiveTier = Math.min(specs.gpuTier, specs.cpuTier);

  if (demand === 3) {
    // Heavyweight modern games
    if (specs.gpuTier >= 5 && specs.ramGb >= 16) {
      return {
        status: 'ultra',
        badgeText: 'Ультра 60+ FPS',
        label: 'Идеально совместим',
        color: '#10b981',
        bgClass: 'bg-emerald-500/20',
        textClass: 'text-emerald-300',
        fpsEstimate: '60–90+ FPS',
        settingsEstimate: 'Максимальные / Ray Tracing',
        summary: 'Ваша система превосходит рекомендуемые требования. Игра пойдёт на ультра-настройках.',
      };
    }
    if (specs.gpuTier >= 4 && specs.ramGb >= 16) {
      return {
        status: 'recommended',
        badgeText: 'Высокие 60 FPS',
        label: 'Рекомендуемые',
        color: '#34d399',
        bgClass: 'bg-emerald-500/15',
        textClass: 'text-emerald-400',
        fpsEstimate: '60 FPS',
        settingsEstimate: 'Высокие настройки графика',
        summary: 'Конфигурация оборудования полностью соответствует рекомендуемым требованиям.',
      };
    }
    if (specs.gpuTier >= 3 && specs.ramGb >= 8) {
      return {
        status: 'minimum',
        badgeText: 'Средние 40–50 FPS',
        label: 'Минимальные',
        color: '#fbbf24',
        bgClass: 'bg-amber-500/15',
        textClass: 'text-amber-300',
        fpsEstimate: '35–50 FPS',
        settingsEstimate: 'Средние / Сбалансированные',
        summary: 'Конфигурация соответствует минимальным требованиям для стабильной игры.',
      };
    }
    return {
      status: 'low',
      badgeText: 'Ниже требований',
      label: 'Ниже минимума',
      color: '#f87171',
      bgClass: 'bg-rose-500/15',
      textClass: 'text-rose-400',
      fpsEstimate: '< 30 FPS',
      settingsEstimate: 'Низкие / FSR Режим',
      summary: 'Конфигурация оборудования ниже официальных минимальных требований игры.',
    };
  }

  if (demand === 2) {
    // Medium demand games
    if (specs.gpuTier >= 4 && specs.ramGb >= 16) {
      return {
        status: 'ultra',
        badgeText: 'Ультра 80+ FPS',
        label: 'Максимум',
        color: '#10b981',
        bgClass: 'bg-emerald-500/20',
        textClass: 'text-emerald-300',
        fpsEstimate: '75–120 FPS',
        settingsEstimate: 'Ультра настройки',
        summary: 'Полный запас производительности для плавной игры с максимальным качеством.',
      };
    }
    if (specs.gpuTier >= 3 && specs.ramGb >= 8) {
      return {
        status: 'recommended',
        badgeText: 'Высокие 60 FPS',
        label: 'Рекомендуемые',
        color: '#34d399',
        bgClass: 'bg-emerald-500/15',
        textClass: 'text-emerald-400',
        fpsEstimate: '60 FPS',
        settingsEstimate: 'Высокие настройки',
        summary: 'Уверенная производительность на высоких настройках графики.',
      };
    }
    if (specs.gpuTier >= 2 && specs.ramGb >= 8) {
      return {
        status: 'minimum',
        badgeText: 'Средние 45 FPS',
        label: 'Минимальные',
        color: '#fbbf24',
        bgClass: 'bg-amber-500/15',
        textClass: 'text-amber-300',
        fpsEstimate: '40–50 FPS',
        settingsEstimate: 'Средние настройки',
        summary: 'Соответствует минимальным системным требованиям.',
      };
    }
    return {
      status: 'low',
      badgeText: 'Слабый ПК',
      label: 'Ниже минимума',
      color: '#f87171',
      bgClass: 'bg-rose-500/15',
      textClass: 'text-rose-400',
      fpsEstimate: '< 30 FPS',
      settingsEstimate: 'Минимальные настройки',
      summary: 'Для комфортной игры рекомендуется обновить видеокарту или процессор.',
    };
  }

  // Lightweight games (Portal 2, Hollow Knight, CS2, Hades)
  if (effectiveTier >= 2) {
    return {
      status: 'ultra',
      badgeText: 'Летит 120+ FPS',
      label: 'Максимальный FPS',
      color: '#10b981',
      bgClass: 'bg-emerald-500/20',
      textClass: 'text-emerald-300',
      fpsEstimate: '120+ FPS',
      settingsEstimate: 'Ультра настройки',
      summary: 'Игра отлично оптимизирована и работает с максимальной плавностью.',
    };
  }
  return {
    status: 'recommended',
    badgeText: '60 FPS',
    label: 'Отлично пойдёт',
    color: '#34d399',
    bgClass: 'bg-emerald-500/15',
    textClass: 'text-emerald-400',
    fpsEstimate: '60 FPS',
    settingsEstimate: 'Высокие / Средние',
    summary: 'Производительности вашего ПК достаточно для комфортного прохождения.',
  };
}
