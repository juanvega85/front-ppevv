import { TeamsPage } from './TeamsPage';
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
    renderForTesting(<TeamsPage dataSource={mockedDataSource} permissions={permissions} />);

    await waitFor(() => screen.getByText(/agrícola/i));
    screen.getByText(/teams/i);
    screen.getByTestId('AddIcon');
    screen.getByText(/alameda/i);
    screen.getByText(/alcántara/i);
  });
});
