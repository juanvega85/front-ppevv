import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleButton } from './ToggleButton';
import renderForTesting from '../../utils/renderForTesting';
import { describe, it, vi } from 'vitest';

describe('Toogle Button', () => {
  it('should render text and button deactive', () => {
    const { container } = renderForTesting(<ToggleButton text="test name" />);
    const activedButton = container.querySelector('.toggleActive');

    screen.getByText('test name');
    expect(activedButton).toBeNull();
  });

  it('should render button active', () => {
    const { container } = renderForTesting(<ToggleButton text="test name" value={true} />);
    const activedButton = container.querySelector('.toggleActive');

    screen.getByText('test name');
    expect(activedButton).not.toBeNull();
  });

  it('should render button disabled', () => {
    renderForTesting(<ToggleButton text="test name" disabled />);

    expect(screen.getByRole('button', { name: 'test name' })).toHaveProperty('disabled', true);
  });

  it('should not call onClick on disabled', () => {
    const callback = vi.fn();
    renderForTesting(<ToggleButton onClick={callback} text="test name" disabled />);

    expect(() => userEvent.click(screen.getByText('test name'))).toThrow();
    expect(callback).not.toHaveBeenCalled();
  });

  it('should call onClick function to activate', () => {
    const callback = vi.fn();
    renderForTesting(<ToggleButton onClick={callback} text="test name" />);

    userEvent.click(screen.getByText('test name'));

    expect(callback).toBeCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should call onClick function to deactivate', () => {
    const callback = vi.fn();
    renderForTesting(<ToggleButton onClick={callback} text="test name" value={true} />);

    userEvent.click(screen.getByText('test name'));

    expect(callback).toBeCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(false);
  });
});
