import { SiteCrud } from './SiteCrud';
import { screen, waitFor, act } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import userEvent from '@testing-library/user-event';
import { IPermissions } from '@ppe/authentication';
import { mockedDataSource } from '../data/sources/mocked';
import { describe, it, vi } from 'vitest';

const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};
const keyMaps = 'AIzaSyC5TxJHxrMVA3WII8ks27J91qVvsXZnzZ0';

describe('SiteCrud', () => {
  it('should render ok', async () => {
    renderForTesting(<SiteCrud dataSource={mockedDataSource} permissions={permissions} apiKey={keyMaps} />);

    screen.getByTestId('AddIcon');

    await waitFor(() => screen.getByText(/Costanera Center/i));
    screen.getByText(/Alejandro Fleming/i);
    screen.getByText(/Caracol Ñuñoa/i);
  });

  it('should open modal to create', async () => {
    renderForTesting(<SiteCrud dataSource={mockedDataSource} permissions={permissions} apiKey={keyMaps} />);

    await waitFor(() => screen.getByText(/Costanera Center/i));
    await act(async () => userEvent.click(screen.getByTestId('AddIcon')));
    await waitFor(() => screen.getByText(/create new site/i));
  });

  it('should open modal to edit', async () => {
    renderForTesting(<SiteCrud dataSource={mockedDataSource} permissions={permissions} apiKey={keyMaps} />);

    await waitFor(() => screen.getByText(/Costanera Center/i));

    const moreButtons = screen.getAllByLabelText('more');
    userEvent.click(moreButtons[0]);
    await waitFor(() => screen.getByText(/edit site/i));

    await act(() => userEvent.click(screen.getByText(/edit site/i)));
    screen.getByText(/update/i);
  });

  it('should call remove', async () => {
    const deleteSite = vi.fn(() => Promise.resolve());
    renderForTesting(<SiteCrud dataSource={{ ...mockedDataSource, deleteSite }} permissions={permissions} apiKey={keyMaps} />);
    await waitFor(() => screen.getByText(/Costanera Center/i));

    const moreButtons = screen.getAllByLabelText('more');
    userEvent.click(moreButtons[0]);
    await waitFor(() => screen.getByText(/remove site/i));

    userEvent.click(screen.getByText(/remove site/i));

    await waitFor(() => screen.getByText(/yes, i am sure/i));
    userEvent.click(screen.getByText(/yes, i am sure/i));

    await waitFor(() => expect(screen.queryByText(/yes, i am sure/i)).toBeNull());
    await waitFor(() => expect(deleteSite).toBeCalledTimes(1));
    expect(deleteSite).toBeCalledWith('631a2f24d227da0f33eb1ea2');
  });
});
