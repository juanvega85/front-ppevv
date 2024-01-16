import { TeamCrud } from './TeamCrud';
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

describe('TeamCrud', () => {
  it('should render ok', async () => {
    renderForTesting(<TeamCrud dataSource={mockedDataSource} permissions={permissions} />);

    screen.getByTestId('AddIcon');

    await waitFor(() => screen.getByText(/agrícola/i));
    screen.getByText(/alameda/i);
    screen.getByText(/alcántara/i);
  });

  it('should open modal to create', async () => {
    renderForTesting(<TeamCrud dataSource={mockedDataSource} permissions={permissions} />);

    await waitFor(() => screen.getByText(/agrícola/i));
    await act(async () => userEvent.click(screen.getByTestId('AddIcon')));
    await waitFor(() => screen.getByText(/create new team/i));
  });

  it('should open modal to edit', async () => {
    renderForTesting(<TeamCrud dataSource={mockedDataSource} permissions={permissions} />);

    await waitFor(() => screen.getByText(/agrícola/i));

    const moreButtons = screen.getAllByLabelText('more');
    userEvent.click(moreButtons[0]);
    await waitFor(() => screen.getByText(/edit team/i));

    userEvent.click(screen.getByText(/edit team/i));
    await waitFor(() => screen.getByText(/update/i));
  });

  it('should call remove', async () => {
    const deleteTeam = vi.fn(() => Promise.resolve());
    renderForTesting(<TeamCrud dataSource={{ ...mockedDataSource, deleteTeam }} permissions={permissions} />);
    await waitFor(() => screen.getByText(/agrícola/i));

    const moreButtons = screen.getAllByLabelText('more');
    userEvent.click(moreButtons[0]);
    await waitFor(() => screen.getByText(/remove team/i));

    userEvent.click(screen.getByText(/remove team/i));

    await waitFor(() => screen.getByText(/yes, i am sure/i));
    userEvent.click(screen.getByText(/yes, i am sure/i));

    await waitFor(() => expect(screen.queryByText(/yes, i am sure/i)).toBeNull());
    await waitFor(() => expect(deleteTeam).toBeCalledTimes(1));
    await waitFor(() => expect(deleteTeam).toBeCalledWith('62b1d7c9036b920314d4b8d6'));
  });
});
