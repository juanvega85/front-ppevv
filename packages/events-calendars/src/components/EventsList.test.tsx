import { EventsList } from './EventsList';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderForTesting } from '../utils/renderForTesting';
import { buildEvents } from '../hooks/buildEvents';
import { shiftReportsMock, timeSlotsMock } from '@ppe/scheduling';
import { vi } from 'vitest';

const events = buildEvents(timeSlotsMock.data, shiftReportsMock.data);

describe('EventsList', () => {
  it('should render ok', () => {
    renderForTesting(<EventsList day={new Date('2022/10/03')} events={[events[0]]} />);

    screen.getByText(/monday 3 Oct 2022/i);
    screen.getByText('2/3');
    screen.getByText('12:30');
    screen.getByTestId('PeopleAltIcon');
    screen.getByTestId('CheckIcon');
  });

  it('should call function onSelect', () => {
    const callback = vi.fn();
    renderForTesting(<EventsList day={new Date('2022/10/03')} events={[events[0]]} onSelect={callback} />);

    userEvent.click(screen.getByText('12:30'));
    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(events[0]);
  });
});
