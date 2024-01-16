import { addTimes } from './addTimes';
import { describe, it, expect } from 'vitest';

describe('addTimes', () => {
  it('should return result', () => {
    expect(addTimes('12:01:02', '01:00:00')).toBe('13:01:02');
    expect(addTimes('23:22:00', '01:00:00')).toBe('00:22:00');
    expect(addTimes('00:00:00', '01:00:00')).toBe('01:00:00');
  });

  it('should return error', () => {
    expect(addTimes('24:00:00', '0')).toBe('ERROR');
    expect(addTimes('00:00:00:00', '')).toBe('ERROR');
    expect(addTimes('fasdf', '')).toBe('ERROR');
    expect(addTimes('', '')).toBe('ERROR');
  });
});
