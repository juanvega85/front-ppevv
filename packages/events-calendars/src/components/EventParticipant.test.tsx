import { EventParticipant } from './EventParticipant';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockedDataSource } from '../data/sources/mocked';
import { vi } from 'vitest';
import { renderForTesting } from '../utils/renderForTesting';
import { IPermissions } from '@ppe/authentication';
import { buildEvents } from '../hooks/buildEvents';
import { shiftReportsMock, timeSlotsMock } from '@ppe/scheduling';

const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};

const events = buildEvents(timeSlotsMock.data, shiftReportsMock.data);

describe('EventParticipant', () => {
  it('should render reported event', () => {
    renderForTesting(<EventParticipant event={events[0]} dataSource={mockedDataSource} permissions={permissions} />);
    screen.getByText(/profiles/i);
    screen.getByText(/report/i);
  });

  it('should render unreported event', () => {
    renderForTesting(<EventParticipant event={events[1]} dataSource={mockedDataSource} permissions={permissions} />);
    screen.getByText(/literature/i);
    screen.getByLabelText(/notes/i);
  });

  it('should call onFinish', async () => {
    const callback = vi.fn();
    renderForTesting(<EventParticipant event={events[1]} onFinish={callback} dataSource={mockedDataSource} permissions={permissions} />);

    act(() => {
      userEvent.click(screen.getByText(/send/i));
    });

    await waitFor(() => expect(callback).toBeCalledTimes(1));
  });

  it('should render future event', () => {
    renderForTesting(<EventParticipant event={{ ...events[2], prevToday: false }} dataSource={mockedDataSource} permissions={permissions} />);
    screen.getByText(/juan medina/i);
    screen.getByText(/paul zoulin/i);
    screen.getByText(/enrique müller/i);
    screen.getByText(/providencia/i);
    screen.getAllByText(/viña del mar/i);
  });
});
