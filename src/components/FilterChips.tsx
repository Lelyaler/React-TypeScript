import React from 'react';

export interface FilterChipOption {
  id: string;
  label: string;
}

const CHIPS: FilterChipOption[] = [
  { id: 'all', label: 'Все игры' },
  { id: 'masterpiece', label: 'Шедевры (90+)' },
  { id: 'short', label: 'Короткие (до 25 ч)' },
  { id: 'top_rated', label: 'Высокий рейтинг' },
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
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              isActive
                ? 'bg-white text-zinc-950 shadow-sm'
                : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
};
