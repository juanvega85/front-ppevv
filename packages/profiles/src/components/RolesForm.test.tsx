import { renderForTesting } from '../utils/renderForTesting';
import { RolesForm } from './RolesForm';
import { mockedDataSource } from '../data/sources/mocked';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockedDataSource as mockedCommon } from '@ppe/common';

describe('RolesForm', () => {
  it('should render form', async () => {
    renderForTesting(<RolesForm userId="1234" dataSource={mockedDataSource} />);

    await waitFor(() => screen.getByLabelText(/roles/i));
    screen.getByText(/save/i);
  });

  it('should call onFinish and updateUserRoles functions', async () => {
    const onFinish = vi.fn();
    const updateUserRoles = vi.fn(() => Promise.resolve());

    renderForTesting(<RolesForm userId="1234" dataSource={{ ...mockedDataSource, ...mockedCommon, updateUserRoles }} onFinish={onFinish} />);

    await waitFor(() => expect(screen.queryByTestId(/loader/i)).toBeNull());
    screen.getByLabelText(/roles/i);

    userEvent.click(screen.getByLabelText(/roles/i));

    screen.getByText(/roles.adminRoleId/i);

    userEvent.click(screen.getByText(/roles.adminRoleId/i));
    userEvent.click(screen.getByText(/save/i));

    await waitFor(() => screen.getByText(/updated successfully/i));
    expect(updateUserRoles).toBeCalledTimes(1);
    expect(updateUserRoles).toBeCalledWith({ userId: '1234', data: ['adminRoleId'] });
    expect(onFinish).toBeCalledTimes(1);
  });
});
