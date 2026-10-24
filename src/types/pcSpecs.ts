export type PcPreset = 'budget' | 'medium' | 'high' | 'ultra' | 'custom';

export interface UserPcSpecs {
  preset: PcPreset;
  name: string;
  gpuTier: number; // 1 to 5
  cpuTier: number; // 1 to 5
  ramGb: number;   // 4, 8, 16, 32, 64
  gpuName: string;
  cpuName: string;
}

export type CompatibilityTier = 'ultra' | 'recommended' | 'minimum' | 'low';

export interface CompatibilityResult {
  status: CompatibilityTier;
  badgeText: string;
  label: string;
  color: string;
  bgClass: string;
  textClass: string;
  fpsEstimate: string;
  settingsEstimate: string;
  summary: string;
}

export const PC_PRESETS: Record<Exclude<PcPreset, 'custom'>, UserPcSpecs> = {
  budget: {
    preset: 'budget',
    name: 'Бюджетный / Офисный',
    gpuTier: 2,
    cpuTier: 2,
    ramGb: 8,
    gpuName: 'GeForce GTX 1050 Ti (4GB)',
    cpuName: 'Intel Core i3-10100F / Ryzen 3 3100',
  },
  medium: {
    preset: 'medium',
    name: 'Народный игровой',
    gpuTier: 3,
    cpuTier: 3,
    ramGb: 16,
    gpuName: 'GeForce GTX 1660 Super / RX 5600 XT',
    cpuName: 'AMD Ryzen 5 3600 / Core i5-10400F',
  },
  high: {
    preset: 'high',
    name: 'Оптимальный RTX',
    gpuTier: 4,
    cpuTier: 4,
    ramGb: 16,
    gpuName: 'GeForce RTX 3060 (12GB) / RTX 4060',
    cpuName: 'AMD Ryzen 5 5600 / Core i5-12400F',
  },
  ultra: {
    preset: 'ultra',
    name: 'Флагманский ПК',
    gpuTier: 5,
    cpuTier: 5,
    ramGb: 32,
    gpuName: 'GeForce RTX 4080 / 4090 (16GB+)',
    cpuName: 'AMD Ryzen 7 7800X3D / Core i7-14700K',
  },
};
