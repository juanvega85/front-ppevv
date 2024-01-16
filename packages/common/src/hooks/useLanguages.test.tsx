import { renderHook } from '@testing-library/react';
import { getReactQueryWrapper } from '../utils/reactQueryWrapper';
import { useLanguages } from './useLanguages';

describe('useLanguages', () => {
  it('should get languages', () => {
    const { result } = renderHook(() => useLanguages(), { wrapper: getReactQueryWrapper() });

    expect(result.current).toEqual([{ id: 'en', name: 'language.en' }]);
  });
});
