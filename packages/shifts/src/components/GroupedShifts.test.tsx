import { fireEvent, screen } from '@testing-library/react';
import { getSitesHydrated, sitesMock } from '@ppe/sites';
import { vi } from 'vitest';
import { shiftsMock } from '../data/mocks/shifts.mock';
import { getShiftsHydrated } from '../utils/getShiftsHydrated';
import { renderForTesting } from '../utils/renderForTesting';
import { GroupedShifts } from './GroupedShifts';

const shifts = getShiftsHydrated(shiftsMock.data).slice(0, 2);
const sites = getSitesHydrated(sitesMock.data);
const days = [
  { id: '0Monday', name: 'Monday' },
  { id: '1Tuesday', name: 'Tuesday' },
  { id: '2Wednesday', name: 'Wednesday' },
  { id: '3Thursday', name: 'Thursday' },
  { id: '4Friday', name: 'Friday' },
  { id: '5Saturday', name: 'Saturday' },
  { id: '6Sunday', name: 'Sunday' },
];
const onChange = vi.fn();

describe('GroupedShifts', () => {
  it('should render data', () => {
    renderForTesting(
      <GroupedShifts id="631a2f24d227da0f33eb1ea1" groupKey="siteId" shifts={shifts} sites={sites} days={days} selected={[]} onChange={onChange} />
    );

    screen.getByText('Costanera Center');
    screen.getByText('Monday');
    screen.getByText('08:00 - 16:00');
    screen.getByText('16:00 - 23:59');
  });

  it('should render ToggleButton selected', () => {
    const { container } = renderForTesting(
      <GroupedShifts
        id="631a2f24d227da0f33eb1ea1"
        groupKey="siteId"
        shifts={shifts}
        sites={sites}
        days={days}
        selected={['631a2f25d227da0f33eb1f76']}
        onChange={onChange}
      />
    );
    const activatedButtons = container.querySelectorAll('.toggleActive');

    expect(activatedButtons).not.toBeNull();
    expect(activatedButtons.length).toBe(1);
  });

  it('should call onChange function when clicked on ToggleButton', () => {
    renderForTesting(
      <GroupedShifts id="631a2f24d227da0f33eb1ea1" groupKey="siteId" shifts={shifts} sites={sites} days={days} selected={[]} onChange={onChange} />
    );

    fireEvent.click(screen.getByText('08:00 - 16:00'));

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('631a2f25d227da0f33eb1f76', true);
  });
});
