import type { Game, GameQuery } from '../types/game';
import type { BacklogEntry } from '../hooks/useFavorites';

export function filterGames(games: Game[], query: GameQuery): Game[] {
  let result = [...games];

  if (query.genreId) {
    result = result.filter((g) =>
      g.genres.some((genre) => genre.id === query.genreId)
    );
  }

  if (query.searchText && query.searchText.trim()) {
    const q = query.searchText.trim().toLowerCase();
    result = result.filter((g) => g.name.toLowerCase().includes(q));
  }

  if (query.filterChip === 'masterpiece') {
    result = result.filter((g) => (g.metacritic || 0) >= 90);
  } else if (query.filterChip === 'short') {
    result = result.filter((g) => g.playtime > 0 && g.playtime <= 25);
  } else if (query.filterChip === 'top_rated') {
    result = result.filter((g) => g.rating >= 4.5);
  }

  if (query.sortOrder) {
    if (query.sortOrder === '-metacritic') {
      result.sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0));
    } else if (query.sortOrder === '-rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (query.sortOrder === '-released') {
      result.sort(
        (a, b) =>
          new Date(b.released || 0).getTime() -
          new Date(a.released || 0).getTime()
      );
    } else if (query.sortOrder === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return result;
}

export function calculateBacklogStats(entries: BacklogEntry[]) {
  return {
    total: entries.length,
    playing: entries.filter((e) => e.status === 'playing').length,
    backlog: entries.filter((e) => e.status === 'backlog').length,
    completed: entries.filter((e) => e.status === 'completed').length,
    totalPlaytime: entries.reduce((acc, curr) => acc + (curr.game.playtime || 0), 0),
  };
}
