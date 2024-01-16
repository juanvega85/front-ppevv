import { screen, waitFor } from '@testing-library/react';
import { Shift } from './Shift';
import { mockedDataSource } from '../data/sources/mocked';
import userEvent from '@testing-library/user-event';
import { IShift } from '../types/IShift';
import { IPermissions } from '@ppe/authentication';
import { renderForTesting } from '../utils/renderForTesting';

const data: IShift = {
  site: {
    coordinates: {
      lat: '-33.417241',
      lng: '-70.605285',
    },
    active: true,
    description: 'Costanera Center',
    name: 'Costanera Center',
    id: '631a2f24d227da0f33eb1ea1',
    secondaryResponsible: [],
    storage: [],
  },
  active: true,
  duration: '02:00:00',
  startTime: '08:00:00',
  day: '0Monday',
  id: '631a2f25d227da0f33eb1f77',
};

const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};

describe('Shift', () => {
  it('should display info', async () => {
    const deleteShift = async () => Promise.reject(new Error('Api error'));
    renderForTesting(<Shift data={data} dataSource={{ ...mockedDataSource, deleteShift }} permissions={permissions} />);
    screen.getByText('08:00 - 10:00');
    screen.getByText('Duration: 02:00 hrs');
    screen.getByTestId('DeleteIcon');
    screen.getByRole('checkbox');
  });

  it('should show error on update', async () => {
    const updateShifts = async () => Promise.reject(new Error('Api error'));
    renderForTesting(<Shift data={data} dataSource={{ ...mockedDataSource, updateShifts }} permissions={permissions} />);
    const switchButton = screen.getByRole('checkbox');
    userEvent.click(switchButton);

    await waitFor(() => screen.findByText('Update shift'));

    const confirmButton = screen.getByText('Yes, I am sure');
    userEvent.click(confirmButton);

    await waitFor(() => screen.findByText('Api error'));
  });

  it('should show error on delete', async () => {
    const deleteShift = async () => Promise.reject(new Error('Api error'));
    renderForTesting(<Shift data={data} dataSource={{ ...mockedDataSource, deleteShift }} permissions={permissions} />);
    const deleteButton = screen.getByTestId('DeleteIcon');
    userEvent.click(deleteButton);

    await waitFor(() => screen.findByText('Remove shift'));

    const confirmButton = screen.getByText('Yes, I am sure');
    userEvent.click(confirmButton);

    await waitFor(() => screen.findByText('Api error'));
  });
});
