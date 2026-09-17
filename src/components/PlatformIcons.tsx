import React from 'react';
import type { Platform } from '../types/game';
import { Monitor, Gamepad2 } from 'lucide-react';

interface Props {
  platforms: { platform: Platform }[];
}

export const PlatformIcons: React.FC<Props> = ({ platforms }) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'pc':
        return (
          <span title="PC">
            <Monitor className="w-4 h-4 text-zinc-400 hover:text-zinc-200 transition-colors" />
          </span>
        );
      case 'playstation':
        return (
          <span className="text-xs font-bold text-blue-400 bg-blue-950/60 px-1 py-0.5 rounded" title="PlayStation">
            PS
          </span>
        );
      case 'xbox':
        return (
          <span className="text-xs font-bold text-green-400 bg-green-950/60 px-1 py-0.5 rounded" title="Xbox">
            XB
          </span>
        );
      case 'nintendo':
        return (
          <span className="text-xs font-bold text-red-400 bg-red-950/60 px-1 py-0.5 rounded" title="Nintendo">
            NSW
          </span>
        );
      default:
        return (
          <span title={slug}>
            <Gamepad2 className="w-4 h-4 text-zinc-400" />
          </span>
        );
    }
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {platforms?.map(({ platform }) => (
        <span key={platform.id}>{getIcon(platform.slug)}</span>
      ))}
    </div>
  );
};
