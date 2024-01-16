import { TimeSlotViewerReported } from './TimeSlotViewerReported';
import { timeSlotsMock } from '../data/mocks/timeslots.mock';
import { shiftReportsMock } from '../data/mocks/shiftReports.mock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderForTesting } from '../utils/renderForTesting';
import { getTimeSlotsHydrated } from '../utils/getTimeSlotsHydrated';
import { getShiftReportsHydrated } from '../utils/getShiftReportsHydrated';

const timeSlot = getTimeSlotsHydrated(timeSlotsMock.data)[0];
const shiftReport = getShiftReportsHydrated(shiftReportsMock.data)[0];

describe('TimeSlotViewerReported', () => {
  it('should render profiles tab', () => {
    renderForTesting(<TimeSlotViewerReported timeSlot={timeSlot} report={shiftReport} />);

    screen.getByText(/profiles/i);
    screen.getByText(/report/i);
    screen.getByText(/juan medina/i);
    screen.getByText(/paul zoulin/i);
    screen.getByText(/enrique müller/i);
    expect(screen.getAllByTestId('CheckIcon').length).toBe(2);
    screen.getByTestId('WarningAmberIcon');
  });

  it('should render report tab', () => {
    renderForTesting(<TimeSlotViewerReported timeSlot={timeSlot} report={shiftReport} />);

    userEvent.click(screen.getByText(/report/i));

    screen.getByText(/books/i);
    screen.getByText(/brochure/i);
    screen.getByText(/videos/i);
    expect(screen.getAllByText('2').length).toBe(3);
    screen.getByText('Test note');
  });
});
