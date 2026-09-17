import React from 'react';
import { Flame, Zap, Star } from 'lucide-react';

export interface FilterChipOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const CHIPS: FilterChipOption[] = [
  { id: 'all', label: 'Все' },
  { id: 'masterpiece', label: 'Шедевры 90+', icon: <Flame className="w-3.5 h-3.5 text-amber-400" /> },
  { id: 'short', label: 'До 25 часов', icon: <Zap className="w-3.5 h-3.5 text-emerald-400" /> },
  { id: 'top_rated', label: 'Рейтинг 4.5+', icon: <Star className="w-3.5 h-3.5 text-yellow-400" /> },
];

interface Props {
  activeChip: string;
  onSelectChip: (chipId: string) => void;
}

export const FilterChips: React.FC<Props> = ({ activeChip, onSelectChip }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
      {CHIPS.map((chip) => {
        const isActive = activeChip === chip.id;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onSelectChip(chip.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              isActive
                ? 'bg-white text-zinc-950 font-semibold shadow-sm'
                : 'bg-white/[0.05] hover:bg-white/[0.08] text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {chip.icon}
            <span>{chip.label}</span>
          </button>
        );
      })}
    </div>
  );
};
