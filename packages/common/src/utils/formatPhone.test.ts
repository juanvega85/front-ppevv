import { formatPhone } from './formatPhone';
import { describe, it, expect } from 'vitest';

describe('format phone', () => {
  it('should format phone', () => {
    expect(formatPhone('56912341234')).toBe('56 9 1234 1234');
    expect(formatPhone('')).toBe('');
    expect(formatPhone()).toBe('');
    expect(formatPhone('123')).toBe('');
    expect(formatPhone('123456abc')).toBe('');
    expect(formatPhone('569123412341')).toBe('');
    expect(formatPhone('56212341234')).toBe('56 2 1234 1234');
  });
});
