import { EventComponent } from './EventComponent';
import { screen } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import { buildEvents } from '../hooks/buildEvents';
import { shiftReportsMock, timeSlotsMock } from '@ppe/scheduling';

const events = buildEvents(timeSlotsMock.data, shiftReportsMock.data);

describe('EventComponent', () => {
  it('should render a past event reported', () => {
    renderForTesting(<EventComponent event={events[0]} />);

    screen.getByText('12:30');
    screen.getByText('2/3');
    screen.getByTestId('PeopleAltIcon');
    screen.getByTestId('CheckIcon');
  });

  it('should render a past event unreported', () => {
    renderForTesting(<EventComponent event={events[1]} />);

    screen.getByText('12:30');
    screen.getByTestId('WarningAmberIcon');
    expect(screen.queryByTestId('CheckIcon')).toBeNull();
  });

  it('should render a future event', () => {
    renderForTesting(<EventComponent event={events[2]} />);

    screen.getByText('12:30');
    expect(screen.queryByTestId('PeopleAltIcon')).toBeNull();
    expect(screen.queryByTestId('CheckIcon')).toBeNull();
  });
});
