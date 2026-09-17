import { useState, useEffect } from 'react';
import type { Game, BacklogStatus } from '../types/game';
import { calculateBacklogStats } from '../utils/gameFilters';


const BACKLOG_STORAGE_KEY = 'game_vault_backlog_v2';

export interface BacklogEntry {
  game: Game;
  status: BacklogStatus;
  userRating?: number;
  updatedAt: string;
}

export const useBacklog = () => {
  const [entries, setEntries] = useState<BacklogEntry[]>(() => {
    try {
      const saved = localStorage.getItem(BACKLOG_STORAGE_KEY);
      if (saved) return JSON.parse(saved);

      const oldFavs = localStorage.getItem('game_vault_favorites');
      if (oldFavs) {
        const parsed: Game[] = JSON.parse(oldFavs);
        return parsed.map((g) => ({
          game: g,
          status: 'backlog' as BacklogStatus,
          updatedAt: new Date().toISOString(),
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BACKLOG_STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.error('Failed to save backlog to localStorage:', e);
    }
  }, [entries]);

  const updateStatus = (game: Game, status: BacklogStatus | null) => {
    setEntries((prev) => {
      if (status === null) {
        return prev.filter((e) => e.game.id !== game.id);
      }
      const existing = prev.find((e) => e.game.id === game.id);
      if (existing) {
        return prev.map((e) =>
          e.game.id === game.id
            ? { ...e, status, updatedAt: new Date().toISOString() }
            : e
        );
      }
      return [
        ...prev,
        {
          game,
          status,
          updatedAt: new Date().toISOString(),
        },
      ];
    });
  };

  const updateRating = (gameId: number, rating: number) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.game.id === gameId
          ? { ...e, userRating: rating, updatedAt: new Date().toISOString() }
          : e
      )
    );
  };

  const getStatus = (gameId: number): BacklogStatus | null => {
    const entry = entries.find((e) => e.game.id === gameId);
    return entry ? entry.status : null;
  };

  const getRating = (gameId: number): number | undefined => {
    const entry = entries.find((e) => e.game.id === gameId);
    return entry?.userRating;
  };

  const stats = calculateBacklogStats(entries);


  return {
    entries,
    updateStatus,
    updateRating,
    getStatus,
    getRating,
    stats,
  };
};

export const useFavorites = useBacklog;

