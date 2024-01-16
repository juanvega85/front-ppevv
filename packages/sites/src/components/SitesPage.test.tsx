import { SitesPage } from './SitesPage';
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

const keyMaps = '123456';

describe('TeamPage', () => {
  it('Should render ok', async () => {
    renderForTesting(<SitesPage dataSource={mockedDataSource} permissions={permissions} apiKeyMaps={keyMaps} />);

    await waitFor(() => screen.getByText(/Costanera Center/i));
    screen.getByText(/sites/i);
    screen.getByTestId('AddIcon');
    screen.getByText(/Alejandro Fleming/i);
    screen.getByText(/Caracol Ñuñoa/i);
  });
});
