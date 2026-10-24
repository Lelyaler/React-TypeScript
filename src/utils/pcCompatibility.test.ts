import { describe, it, expect } from 'vitest';
import { evaluatePcCompatibility, PC_PRESETS } from './pcCompatibility';
import type { Game } from '../types/game';

const MOCK_HEAVY_GAME: Game = {
  id: 1,
  slug: 'cyberpunk-2077',
  name: 'Cyberpunk 2077',
  released: '2020-12-10',
  background_image: '',
  rating: 4.5,
  rating_top: 5,
  metacritic: 86,
  playtime: 60,
  genres: [],
  parent_platforms: [],
};

const MOCK_LIGHT_GAME: Game = {
  id: 2,
  slug: 'hollow-knight',
  name: 'Hollow Knight',
  released: '2017-02-24',
  background_image: '',
  rating: 4.8,
  rating_top: 5,
  metacritic: 90,
  playtime: 30,
  genres: [],
  parent_platforms: [],
};

describe('pcCompatibility evaluator', () => {
  it('evaluates ultra preset as smooth ultra for heavy games', () => {
    const result = evaluatePcCompatibility(MOCK_HEAVY_GAME, PC_PRESETS.ultra);
    expect(result.status).toBe('ultra');
    expect(result.badgeText).toContain('60+ FPS');
  });

  it('evaluates budget preset for heavy games appropriately', () => {
    const result = evaluatePcCompatibility(MOCK_HEAVY_GAME, PC_PRESETS.budget);
    expect(['minimum', 'low']).toContain(result.status);
  });

  it('evaluates light 2D games as ultra playable on all presets', () => {
    const result = evaluatePcCompatibility(MOCK_LIGHT_GAME, PC_PRESETS.budget);
    expect(result.status).toBe('ultra');
  });
});
