import { fireEvent, screen } from '@testing-library/react';
import { IPermissions } from '@ppe/authentication';
import { vi } from 'vitest';
import { sitesMock } from '../data/mocks/sites.mock';
import { ISite } from '../types/ISite';
import { renderForTesting } from '../utils/renderForTesting';
import { SiteActionsTable } from './SiteActionsTable';

const site: ISite = sitesMock.data.sites[0];

describe('SiteActionsTable', () => {
  it('should render icon more actions', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    screen.getByTestId('MoreVertIcon');
  });

  it('should render all options available', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    fireEvent.click(screen.getByTestId('MoreVertIcon'));

    expect(screen.getByRole('menuitem', { name: /view site/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /edit site/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /remove site/i }).getAttribute('aria-disabled')).toBeFalsy();
  });

  it('should render disable only view button', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: false,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    fireEvent.click(screen.getByTestId('MoreVertIcon'));

    expect(screen.getByRole('menuitem', { name: /view site/i }).getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /edit site/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /remove site/i }).getAttribute('aria-disabled')).toBeFalsy();
  });

  it('should render disable only edit button', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: false,
      canDelete: true,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    fireEvent.click(screen.getByTestId('MoreVertIcon'));

    expect(screen.getByRole('menuitem', { name: /view site/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /edit site/i }).getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByRole('menuitem', { name: /remove site/i }).getAttribute('aria-disabled')).toBeFalsy();
  });

  it('should render disable only remove button', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: false,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    fireEvent.click(screen.getByTestId('MoreVertIcon'));

    expect(screen.getByRole('menuitem', { name: /view site/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /edit site/i }).getAttribute('aria-disabled')).toBeFalsy();
    expect(screen.getByRole('menuitem', { name: /remove site/i }).getAttribute('aria-disabled')).toBeTruthy();
  });

  it('should call onAction function with view mode', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    fireEvent.click(screen.getByTestId('MoreVertIcon'));
    fireEvent.click(screen.getByRole('menuitem', { name: /view site/i }));

    expect(onAction).toBeCalledTimes(1);
    expect(onAction).toBeCalledWith('view', site);
  });

  it('should call onAction function with edit mode', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    fireEvent.click(screen.getByTestId('MoreVertIcon'));
    fireEvent.click(screen.getByRole('menuitem', { name: /edit site/i }));

    expect(onAction).toBeCalledTimes(1);
    expect(onAction).toBeCalledWith('edit', site);
  });

  it('should call onAction function with remove mode', () => {
    const onAction = vi.fn();
    const permissions: IPermissions = {
      canCreate: true,
      canRead: true,
      canUpdate: true,
      canDelete: true,
    };

    renderForTesting(<SiteActionsTable data={site} onAction={onAction} permissions={permissions} />);

    fireEvent.click(screen.getByTestId('MoreVertIcon'));
    fireEvent.click(screen.getByRole('menuitem', { name: /remove site/i }));

    expect(onAction).toBeCalledTimes(1);
    expect(onAction).toBeCalledWith('delete', site);
  });
});
