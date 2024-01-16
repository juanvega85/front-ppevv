import { TeamActionsTable } from './TeamActionsTable';
import { screen, waitFor } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import userEvent from '@testing-library/user-event';
import { IPermissions } from '@ppe/authentication';
import { teamsMock } from '../data/mocks/teams.mock';
import { describe, it, vi } from 'vitest';

describe('TeamActionsPage', () => {
  it('should render icon more actions', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<TeamActionsTable permissions={permissions} onAction={onAction} data={teamsMock.data.teams[0]} />);

    screen.getByTestId('MoreVertIcon');
  });

  it('should render enable edit and disabled delete', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: false,
      canRead: false,
      canUpdate: true,
      canDelete: false,
    };

    renderForTesting(<TeamActionsTable permissions={permissions} onAction={onAction} data={teamsMock.data.teams[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/edit team/i));

    expect(screen.getByRole('menuitem', { name: /edit team/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /remove team/i }).getAttribute('aria-disabled')).toBeTruthy();
  });

  it('should render enable delete and disabled edit', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: false,
      canRead: false,
      canUpdate: false,
      canDelete: true,
    };

    renderForTesting(<TeamActionsTable permissions={permissions} onAction={onAction} data={teamsMock.data.teams[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/edit team/i));

    expect(screen.getByRole('menuitem', { name: /edit team/i }).getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /remove team/i }).getAttribute('aria-disabled')).toBeFalsy();
  });

  it('should call onAction function with edit', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<TeamActionsTable permissions={permissions} onAction={onAction} data={teamsMock.data.teams[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/edit team/i));

    userEvent.click(screen.getByText(/edit team/i));

    await waitFor(() => expect(onAction).toBeCalledTimes(1));
    expect(onAction).toBeCalledWith('edit', {
      name: 'Inglesa Viña del Mar',
      id: '62abdd3d89d5bc0ffc129115',
    });
  });

  it('should call onAction function with delete', async () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<TeamActionsTable permissions={permissions} onAction={onAction} data={teamsMock.data.teams[0]} />);

    userEvent.click(screen.getByTestId('MoreVertIcon'));
    await waitFor(() => screen.getByText(/Remove team/i));

    userEvent.click(screen.getByText(/Remove team/i));

    await waitFor(() => expect(onAction).toBeCalledTimes(1));
    expect(onAction).toBeCalledWith('delete', {
      name: 'Inglesa Viña del Mar',
      id: '62abdd3d89d5bc0ffc129115',
    });
  });
});
