import { useState, useEffect } from 'react';
import type { Game, GameQuery } from '../types/game';

import { fetchFromApi, getApiKey } from '../services/api-client';
import { MOCK_GAMES } from '../data/mockGames';

interface UseGamesResult {
  games: Game[];
  error: string | null;
  isLoading: boolean;
  isUsingMock: boolean;
}

export const useGames = (gameQuery: GameQuery): UseGamesResult => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUsingMock, setIsUsingMock] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const apiKey = getApiKey();

    const loadGames = async () => {
      setIsLoading(true);
      setError(null);

      if (!apiKey) {
        setIsUsingMock(true);
        setTimeout(() => {
          if (!isMounted) return;
          let filtered = [...MOCK_GAMES];

          if (gameQuery.genreId) {
            filtered = filtered.filter((g) =>
              g.genres.some((genre) => genre.id === gameQuery.genreId)
            );
          }

          if (gameQuery.searchText) {
            const query = gameQuery.searchText.toLowerCase();
            filtered = filtered.filter((g) =>
              g.name.toLowerCase().includes(query)
            );
          }

          if (gameQuery.sortOrder) {
            if (gameQuery.sortOrder === '-metacritic') {
              filtered.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0));
            } else if (gameQuery.sortOrder === '-rating') {
              filtered.sort((a, b) => b.rating - a.rating);
            } else if (gameQuery.sortOrder === '-released') {
              filtered.sort(
                (a, b) =>
                  new Date(b.released || 0).getTime() -
                  new Date(a.released || 0).getTime()
              );
            } else if (gameQuery.sortOrder === 'name') {
              filtered.sort((a, b) => a.name.localeCompare(b.name));
            }
          }

          setGames(filtered);
          setIsLoading(false);
        }, 250);
        return;
      }

      try {
        setIsUsingMock(false);
        const data = await fetchFromApi<Game>('/games', {
          genres: gameQuery.genreId || undefined,
          parent_platforms: gameQuery.platformId || undefined,
          ordering: gameQuery.sortOrder || undefined,
          search: gameQuery.searchText || undefined,
          page_size: 24,
        });

        if (isMounted) {
          setGames(data.results || []);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        console.error('Failed to fetch live games:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Не удалось загрузить игры из RAWG API'
        );
        setGames(MOCK_GAMES);
        setIsUsingMock(true);
        setIsLoading(false);
      }
    };

    loadGames();

    return () => {
      isMounted = false;
    };
  }, [gameQuery.genreId, gameQuery.platformId, gameQuery.sortOrder, gameQuery.searchText]);

  return { games, error, isLoading, isUsingMock };
};
