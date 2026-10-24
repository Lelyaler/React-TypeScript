import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, Volume2, Sparkles, Radio, Trees, CloudRain } from 'lucide-react';
import { ambientPlayer, AMBIENT_TRACKS } from '../utils/ambientAudio';
import { sounds } from '../utils/soundEffects';

export const AmbientAudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(ambientPlayer.getPlaying());
  const [currentTrack, setCurrentTrack] = useState(ambientPlayer.getCurrentTrack());
  const [volume, setVolume] = useState(ambientPlayer.getVolume());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return ambientPlayer.subscribe(() => {
      setIsPlaying(ambientPlayer.getPlaying());
      setCurrentTrack(ambientPlayer.getCurrentTrack());
      setVolume(ambientPlayer.getVolume());
    });
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('mousedown', handleOutsideClick);
    }
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const activeTrackInfo = AMBIENT_TRACKS.find((t) => t.id === currentTrack) || AMBIENT_TRACKS[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => {
          sounds.playSelect();
          setIsOpen((prev) => !prev);
        }}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all select-none ${
          isPlaying
            ? 'bg-blue-600/25 text-blue-300 shadow-sm'
            : 'text-zinc-400 hover:text-white hover:bg-white/5'
        }`}
        title="Атмосферный саундтрек"
      >
        <div className="relative flex items-center justify-center w-3.5 h-3.5">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2.5 bg-blue-400 animate-pulse" />
              <span className="w-0.5 h-3.5 bg-blue-300 animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-blue-400 animate-pulse delay-150" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5" />
          )}
        </div>
        <span className="hidden xl:inline text-[11px] truncate max-w-[90px]">
          {isPlaying ? activeTrackInfo.name : 'OST'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 p-4 rounded-2xl bg-zinc-900/98 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-50 text-white animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold leading-tight">Фоновый эмбиент</h4>
                <p className="text-[10px] text-zinc-400">Синтезатор атмосферы</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                sounds.playSelect();
                ambientPlayer.toggle();
              }}
              className={`p-2 rounded-xl transition-all ${
                isPlaying
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-zinc-950 font-bold hover:bg-zinc-200'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>

          {/* Track selection */}
          <div className="space-y-1.5 mb-3">
            {AMBIENT_TRACKS.map((track) => {
              const isCurrent = currentTrack === track.id;
              const TrackIcon =
                track.id === 'cyber' ? Radio : track.id === 'fantasy' ? Trees : CloudRain;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => {
                    sounds.playSelect();
                    ambientPlayer.setTrack(track.id);
                    if (!isPlaying) ambientPlayer.play();
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${
                    isCurrent
                      ? 'bg-white/10 text-white font-semibold'
                      : 'hover:bg-white/5 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className={`p-1.5 rounded-lg ${isCurrent ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-400'}`}>
                    <TrackIcon className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium leading-tight truncate">{track.name}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{track.tagline}</div>
                  </div>
                  {isCurrent && isPlaying && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Volume slider */}
          <div className="pt-3 flex items-center gap-2.5">
            <Volume2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => ambientPlayer.setVolume(parseFloat(e.target.value))}
              className="w-full accent-blue-400 h-1 bg-zinc-800 rounded-lg cursor-pointer"
            />
            <span className="text-[10px] font-mono text-zinc-400 w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
