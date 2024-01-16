import { screen, waitFor } from '@testing-library/react';
import { ShiftsPage } from './ShiftsPage';
import { mockedDataSource } from '../data/sources/mocked';
import { renderForTesting } from '../utils/renderForTesting';
import { IPermissions } from '@ppe/authentication';

const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};

describe('ShiftsPage', () => {
  it('should render Loader', () => {
    renderForTesting(<ShiftsPage dataSource={mockedDataSource} permissions={permissions} />);

    screen.getByTestId('loader');
    screen.getByTestId('AddIcon');
    screen.getByText('Order by sites');
    screen.getByText('Order by days');
  });

  it('should render info shifts and no render Loader', async () => {
    renderForTesting(<ShiftsPage dataSource={mockedDataSource} permissions={permissions} />);

    await waitFor(() => screen.getByText(/costanera center/i));
    expect(screen.queryByTestId('loader')).toBeNull();
    screen.getByText(/alejandro fleming/i);
    screen.getByText(/caracol ñuñoa/i);
    screen.getByText(/estadio nacional/i);
  });
});
