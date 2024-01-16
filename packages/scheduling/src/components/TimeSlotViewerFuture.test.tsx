import { TimeSlotViewerFuture } from './TimeSlotViewerFuture';
import { timeSlotsMock } from '../data/mocks/timeslots.mock';
import { screen } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import { getTimeSlotsHydrated } from '../utils/getTimeSlotsHydrated';

const timeSlot = getTimeSlotsHydrated(timeSlotsMock.data)[0];

describe('TimeSlotViewerFuture', () => {
  it('should render ok', () => {
    renderForTesting(<TimeSlotViewerFuture timeSlot={timeSlot} />);

    screen.getByText(/juan medina/i);
    screen.getByText(/paul zoulin/i);
    screen.getByText(/enrique müller/i);
  });
});
