import { ProfilesPage } from './ProfilesPage';
import { screen, waitFor } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import { IPermissions } from '@ppe/authentication';
import { describe, it } from 'vitest';
import { mockedDataSource } from '../data/sources/mocked';

const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};

describe('TeamPage', () => {
  it('Should render ok', async () => {
    renderForTesting(<ProfilesPage dataSource={mockedDataSource} permissions={permissions} />);

    await waitFor(() => screen.getByText(/Paul/i));
    screen.getByText(/Profiles/i);
    screen.getByTestId('AddIcon');
    screen.getByText(/Maria De Los Angeles/i);
    screen.getByText(/Enrique/i);
  });
});
