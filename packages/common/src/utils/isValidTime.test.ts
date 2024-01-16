import { isValidTime } from './isValidTime';
import { describe, it, expect } from 'vitest';

describe('isValidTime', () => {
  it('should be valid', () => {
    expect(isValidTime('12:01:02')).toBe(true);
    expect(isValidTime('23:22:00')).toBe(true);
    expect(isValidTime('00:00:00')).toBe(true);
  });

  it('should be invalid', () => {
    expect(isValidTime('24:00:00')).toBe(false);
    expect(isValidTime('00:00:00:00')).toBe(false);
    expect(isValidTime('fasdf')).toBe(false);
    expect(isValidTime('')).toBe(false);
  });
});
