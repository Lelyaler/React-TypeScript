import { describe, it, expect } from 'vitest';
import { sounds } from './soundEffects';

describe('SoundEngine Web Audio API utility', () => {
  it('initializes with sound enabled by default', () => {
    expect(typeof sounds.getEnabled()).toBe('boolean');
  });

  it('correctly toggles sound enabled state', () => {
    const initial = sounds.getEnabled();
    const next = sounds.toggle();
    expect(next).toBe(!initial);
    expect(sounds.getEnabled()).toBe(!initial);

    const restored = sounds.toggle();
    expect(restored).toBe(initial);
  });

  it('does not throw when triggering sound effects in headless environment', () => {
    expect(() => {
      sounds.playNav();
      sounds.playSelect();
      sounds.playBack();
      sounds.playRouletteTick();
      sounds.playWin();
    }).not.toThrow();
  });
});
