import { renderHook } from '@testing-library/react';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useWeekDayName } from './useWeekDayName';

describe('useWeekDayName', () => {
  it('should return day name when parameter is string', () => {
    const date = '2022-10-24';
    const { result } = renderHook(() => useWeekDayName(date), { wrapper: getReactQueryWrapper() });

    expect(result.current).toBe('Monday');
  });

  it('should return day name when parameter is Date', () => {
    const date = new Date('2022-10-24 16:00:00');
    const { result } = renderHook(() => useWeekDayName(date), { wrapper: getReactQueryWrapper() });

    expect(result.current).toBe('Monday');
  });

  it("should return '' when parameter is null", () => {
    const date = null;
    const { result } = renderHook(() => useWeekDayName(date), { wrapper: getReactQueryWrapper() });

    expect(result.current).toBe('');
  });
});
