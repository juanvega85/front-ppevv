import { screen } from '@testing-library/react';
import { sitesMock } from '../data/mocks/sites.mock';
import userEvent from '@testing-library/user-event';
import { SitesToggleList } from './SitesToggleList';
import { renderForTesting } from '../utils/renderForTesting';
import { vi } from 'vitest';

const data = sitesMock.data.sites.slice(0, 3);

describe('SitesToggleList', () => {
  it('should render all sites', () => {
    renderForTesting(<SitesToggleList sites={data} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(data.length * 2); // sites + maps
  });

  it('should render all sites disabled', () => {
    renderForTesting(<SitesToggleList sites={data} disabled />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveProperty('disabled', true);
    });
  });

  it('should render active items using select array', () => {
    const selected = ['631a2f24d227da0f33eb1ea6', '631a2f24d227da0f33eb1eaa', '631a2f24d227da0f33eb1eac'];
    const { container } = renderForTesting(<SitesToggleList sites={sitesMock.data.sites} selected={selected} />);

    const activeButtons = container.querySelectorAll('.toggleActive');
    expect(activeButtons.length).toBe(selected.length);
  });

  it('should call onChange to activate', () => {
    const callback = vi.fn();
    renderForTesting(<SitesToggleList sites={data} onChange={callback} />);

    userEvent.click(screen.getByText(/costanera/i));
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('631a2f24d227da0f33eb1ea1', true);
  });

  it('should call onChange to desactivate', () => {
    const callback = vi.fn();
    renderForTesting(<SitesToggleList sites={data} onChange={callback} selected={['631a2f24d227da0f33eb1ea1']} />);

    userEvent.click(screen.getByText(/costanera/i));
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('631a2f24d227da0f33eb1ea1', false);
  });
});
