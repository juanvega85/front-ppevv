import { screen, waitFor } from '@testing-library/react';
import { ReportForm } from './ReportForm';
import { timeSlotsMock } from '../data/mocks/timeslots.mock';
import { mockedDataSource } from '../data/sources/mocked';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderForTesting } from '../utils/renderForTesting';
import { getTimeSlotsHydrated } from '../utils/getTimeSlotsHydrated';

const timeSlot = getTimeSlotsHydrated(timeSlotsMock.data)[0];

describe('NewReportForm', () => {
  it('should render ok', () => {
    renderForTesting(<ReportForm timeSlot={timeSlot} dataSource={mockedDataSource} />);

    screen.getByText(/literature/i);
    screen.getByText(/books/i);
    screen.getByText(/magazines/i);
    screen.getByText(/brochures/i);
    screen.getByText(/tracts/i);
    screen.getByText(/videos/i);

    screen.getByText(/profiles/i);
    screen.getByText(/juan medina/i);
    screen.getByText(/paul zoulin/i);
    screen.getByText(/enrique müller/i);
    screen.getByLabelText(/notes/i);

    expect(screen.getAllByTestId('RemoveCircleIcon').length).toBe(5);
    expect(screen.getAllByTestId('AddCircleIcon').length).toBe(5);
    expect(screen.getAllByText('0').length).toBe(5);
    screen.getByText(/send/i);
  });

  it('should call onFinish', async () => {
    const callback = vi.fn();
    renderForTesting(<ReportForm timeSlot={timeSlot} onFinish={callback} dataSource={mockedDataSource} />);

    userEvent.click(screen.getByText(/send/i));

    await waitFor(() => screen.getByText(/Created successfully/i));
    await waitFor(() => expect(callback).toBeCalledTimes(1));
  });

  it('should send data', async () => {
    const createReport = vi.fn(() => Promise.resolve({ data: [] }));
    renderForTesting(<ReportForm timeSlot={timeSlot} dataSource={{ ...mockedDataSource, createReport }} />);

    userEvent.click(screen.getAllByTestId('AddCircleIcon')[0]);
    userEvent.click(screen.getByText(/juan medina/i));
    userEvent.click(screen.getByText(/paul zoulin/i));
    userEvent.type(screen.getByLabelText(/notes/i), 'Test note');
    userEvent.click(screen.getByText(/send/i));

    await waitFor(() => expect(createReport).toBeCalledTimes(1));
    await waitFor(() =>
      expect(createReport).toBeCalledWith({
        data: [
          {
            activity: {
              Books: '1',
            },
            date: '2022-10-03',
            notes: 'Test note',
            shift: {
              id: '62ae34d43e83340a92863709',
            },
            users: [
              {
                id: '62b0a4e43e83340a9286372d',
              },
              {
                id: '62abdd8e89d5bc0ffc129116',
              },
            ],
          },
        ],
        shiftId: '62ae34d43e83340a92863709',
      })
    );
  });
});
