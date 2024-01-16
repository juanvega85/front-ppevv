import { ProfileCrud } from './ProfileCrud';
import { act, screen, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import userEvent from '@testing-library/user-event';
import { renderForTesting } from '../utils/renderForTesting';
import { mockedDataSource as mockedCommon } from '@ppe/common';
import { vi } from 'vitest';
import { IPermissions } from '@ppe/authentication';

const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};

describe('ProfileCrud', () => {
  it('should render ok', async () => {
    renderForTesting(<ProfileCrud dataSource={{ ...mockedDataSource, ...mockedCommon }} permissions={permissions} />);

    screen.getByTestId('AddIcon');

    await waitFor(() => screen.getByText(/zoulin/i));
    screen.getByText(/müller/i);
    screen.getByText(/medina/i);
  });

  it('should open modal to create', async () => {
    renderForTesting(<ProfileCrud dataSource={{ ...mockedDataSource, ...mockedCommon }} permissions={permissions} />);

    await act(async () => {
      await waitFor(() => userEvent.click(screen.getByTestId('AddIcon')));
    });

    screen.getByText(/create new profile/i);
  });

  it('should open modal to edit', async () => {
    renderForTesting(<ProfileCrud dataSource={{ ...mockedDataSource, ...mockedCommon }} permissions={permissions} />);

    await waitFor(() => screen.getByText(/zoulin/i));

    const moreButtons = screen.getAllByLabelText('more');
    userEvent.click(moreButtons[0]);

    screen.getByText(/edit profile/i);

    await act(async () => {
      await waitFor(() => userEvent.click(screen.getByText(/edit profile/i)));
    });

    screen.getByText(/update/i);
  });

  it('should call remove', async () => {
    const deleteProfile = vi.fn(() => Promise.resolve());
    renderForTesting(<ProfileCrud dataSource={{ ...mockedDataSource, ...mockedCommon, deleteProfile }} permissions={permissions} />);
    await waitFor(() => screen.getByText(/zoulin/i));

    const moreButtons = screen.getAllByLabelText('more');
    userEvent.click(moreButtons[0]);
    await waitFor(() => screen.getByText(/remove profile/i));

    userEvent.click(screen.getByText(/remove profile/i));

    await waitFor(() => screen.getByText(/yes, i am sure/i));
    userEvent.click(screen.getByText(/yes, i am sure/i));

    await waitFor(() => expect(screen.queryByText(/yes, i am sure/i)).toBeNull());
    await waitFor(() => expect(deleteProfile).toBeCalledTimes(1));
    await waitFor(() => expect(deleteProfile).toBeCalledWith('62abdd8e89d5bc0ffc129116'));
  });
});
