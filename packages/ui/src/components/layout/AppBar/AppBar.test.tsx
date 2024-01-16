import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppBar } from './AppBar';

describe('AppBar', () => {
  test('should show app name', () => {
    render(<AppBar appTitle="Test" />);
    screen.findByText('Test');
  });

  test('should call handleDrawerToggle', () => {
    const handleDrawerToggle = vi.fn();
    render(<AppBar handleDrawerToggle={handleDrawerToggle} />);
    fireEvent.click(screen.getByLabelText('open drawer'));
    expect(handleDrawerToggle).toHaveBeenCalledTimes(1);
  });
});
