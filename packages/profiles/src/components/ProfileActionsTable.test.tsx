import { ProfileActionsTable } from './ProfileActionsTable';
import { screen, waitFor } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import userEvent from '@testing-library/user-event';
import { IPermissions } from '@ppe/authentication';
import { profilesMock } from '../data/mocks/profiles.mock';
import { describe, it, vi } from 'vitest';

describe('ProfileActionsTable', () => {
  it('should render icon more actions', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    screen.getByTestId('MoreVertIcon');
  });

  it('should render disabled read option', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: false,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/View profile/i));

    expect(screen.getByRole('menuitem', { name: /View profile/i }).getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /edit profile/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /edit roles/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /remove profile/i }).getAttribute('aria-disabled')).toBeFalsy();
  });

  it('should render disabled update option', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: false,
      canDelete: true,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/View profile/i));

    expect(screen.getByRole('menuitem', { name: /Edit profile/i }).getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /Edit roles/i }).getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /View profile/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /remove profile/i }).getAttribute('aria-disabled')).toBeFalsy();
  });

  it('should render disabled remove option', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: false,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/View profile/i));

    expect(screen.getByRole('menuitem', { name: /Edit profile/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /Edit roles/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /View profile/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /remove profile/i }).getAttribute('aria-disabled')).toBeTruthy();
  });

  it('should call onAction function with view profile', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/view profile/i));

    userEvent.click(screen.getByText(/view profile/i));

    await waitFor(() => expect(onAction).toBeCalledTimes(1));
    expect(onAction).toBeCalledWith('view', profilesMock.data.profiles[0]);
  });

  it('should call onAction function with edit profile', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/view profile/i));

    userEvent.click(screen.getByText(/edit profile/i));

    await waitFor(() => expect(onAction).toBeCalledTimes(1));
    expect(onAction).toBeCalledWith('edit', profilesMock.data.profiles[0]);
  });

  it('should call onAction function with edit roles', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/view profile/i));

    userEvent.click(screen.getByText(/edit roles/i));

    await waitFor(() => expect(onAction).toBeCalledTimes(1));
    expect(onAction).toBeCalledWith('editRoles', profilesMock.data.profiles[0]);
  });

  it('should call onAction function with remove profile', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<ProfileActionsTable permissions={permissions} onAction={onAction} data={profilesMock.data.profiles[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/view profile/i));

    userEvent.click(screen.getByText(/remove profile/i));

    await waitFor(() => expect(onAction).toBeCalledTimes(1));
    expect(onAction).toBeCalledWith('delete', profilesMock.data.profiles[0]);
  });
});
