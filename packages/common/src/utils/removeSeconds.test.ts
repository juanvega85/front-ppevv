import { removeSeconds } from './removeSeconds';
import { describe, it, expect } from 'vitest';

describe('removeSeconds', () => {
  it('should return time without seconds', () => {
    expect(removeSeconds('12:01:02')).toBe('12:01');
    expect(removeSeconds('23:22:00')).toBe('23:22');
    expect(removeSeconds('00:00:00')).toBe('00:00');
  });

  it('should return error', () => {
    expect(removeSeconds('24:00:00')).toBe('ERROR');
    expect(removeSeconds('00:00:00:00')).toBe('ERROR');
    expect(removeSeconds('fasdf')).toBe('ERROR');
    expect(removeSeconds('')).toBe('ERROR');
  });
});
