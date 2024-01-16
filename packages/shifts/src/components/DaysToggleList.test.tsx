import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderForTesting } from '../utils/renderForTesting';
import { DaysToggleList } from './DaysToggleList';
import { vi } from 'vitest';

const days = [
  {
    id: '0Monday',
    name: 'Monday',
  },
  {
    id: '1Tuesday',
    name: 'Tuesday',
  },
  {
    id: '2Wednesday',
    name: 'Wednesday',
  },
  {
    id: '3Thursday',
    name: 'Thursday',
  },
  {
    id: '4Friday',
    name: 'Friday',
  },
  {
    id: '5Saturday',
    name: 'Saturday',
  },
  {
    id: '6Sunday',
    name: 'Sunday',
  },
];

describe('Days component', () => {
  it('should render days buttons', () => {
    renderForTesting(<DaysToggleList days={days} />);

    for (const day of days) {
      screen.getByText(day.name);
    }

    expect(screen.getAllByRole('button').length).toBe(days.length);
  });

  it('should render active items using select array', () => {
    const selected = ['0Monday', '1Tuesday', '2Wednesday'];
    const { container } = renderForTesting(<DaysToggleList days={days} selected={selected} />);

    const activeButtons = container.querySelectorAll('.toggleActive');
    expect(activeButtons.length).toBe(selected.length);
  });

  it('should call onChange to activate', () => {
    const callback = vi.fn();
    renderForTesting(<DaysToggleList days={days} onChange={callback} />);

    userEvent.click(screen.getByText('Monday'));
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('0Monday', true);
  });

  it('should call onChange to desactivate', () => {
    const callback = vi.fn();
    renderForTesting(<DaysToggleList days={days} onChange={callback} selected={['0Monday']} />);

    userEvent.click(screen.getByText('Monday'));
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('0Monday', false);
  });

  it('should render all days disabled', () => {
    renderForTesting(<DaysToggleList days={days.splice(0, 2)} disabled />);

    expect(screen.getByRole('button', { name: 'Monday' })).toHaveProperty('disabled', true);
    expect(screen.getByRole('button', { name: 'Tuesday' })).toHaveProperty('disabled', true);
  });
});
