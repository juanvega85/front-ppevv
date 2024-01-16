import { fireEvent, screen } from '@testing-library/react';
import { IPermissions } from '@ppe/authentication';
import { getSitesHydrated, sitesMock } from '@ppe/sites';
import { vi } from 'vitest';
import { shiftsMock } from '../data/mocks/shifts.mock';
import { mockedDataSource } from '../data/sources/mocked';
import { getShiftsHydrated } from '../utils/getShiftsHydrated';
import { renderForTesting } from '../utils/renderForTesting';
import { GroupedShiftsAccordion } from './GroupedShiftsAccordion';

const shifts = getShiftsHydrated(shiftsMock.data).slice(0, 2);
const sites = getSitesHydrated(sitesMock.data);
const days = [
  { id: '0Monday', name: 'Monday' },
  { id: '1Tuesday', name: 'Tuesday' },
  { id: '2Wednesday', name: 'Wednesday' },
  { id: '3Thursday', name: 'Thursday' },
  { id: '4Friday', name: 'Friday' },
  { id: '5Saturday', name: 'Saturday' },
  { id: '6Sunday', name: 'Sunday' },
];
const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};

describe('GroupedShiftsAccordion', () => {
  it('should render ToggleButton site with expanded false', () => {
    const getIsOpen = vi.fn();
    const toggle = vi.fn();

    renderForTesting(
      <GroupedShiftsAccordion
        id="631a2f24d227da0f33eb1ea1"
        shifts={shifts}
        sites={sites}
        days={days}
        permissions={permissions}
        dataSource={mockedDataSource}
        toggle={toggle}
        getIsOpen={getIsOpen}
        groupKey="siteId"
      />
    );

    screen.getByText(/costanera center/i);

    expect(screen.getByRole('button', { name: /costanera center/i }).getAttribute('aria-expanded')).toBe('false');
  });

  it('should expand accordeon when click ToggleButton site and show ToggleButton day expanded false', () => {
    const getIsOpen = vi.fn();
    const toggle = vi.fn();

    renderForTesting(
      <GroupedShiftsAccordion
        id="631a2f24d227da0f33eb1ea1"
        shifts={shifts}
        sites={sites}
        days={days}
        permissions={permissions}
        dataSource={mockedDataSource}
        toggle={toggle}
        getIsOpen={getIsOpen}
        groupKey="siteId"
      />
    );

    fireEvent.click(screen.getByText(/costanera center/i));

    expect(screen.getByRole('button', { name: /costanera center/i }).getAttribute('aria-expanded')).toBe('true');
    screen.getByText(/monday/i);
    expect(screen.getByRole('button', { name: /monday/i }).getAttribute('aria-expanded')).toBe('false');
  });

  it('should expand accordeon from day when click ToggleButton day and show info shift', () => {
    const getIsOpen = vi.fn();
    const toggle = vi.fn();

    renderForTesting(
      <GroupedShiftsAccordion
        id="631a2f24d227da0f33eb1ea1"
        shifts={shifts}
        sites={sites}
        days={days}
        permissions={permissions}
        dataSource={mockedDataSource}
        toggle={toggle}
        getIsOpen={getIsOpen}
        groupKey="siteId"
      />
    );

    fireEvent.click(screen.getByText(/costanera center/i));
    fireEvent.click(screen.getByText(/monday/i));

    expect(screen.getByRole('button', { name: /monday/i }).getAttribute('aria-expanded')).toBe('true');
    screen.getByText(/08:00 - 16:00/i);
    screen.getByText(/Duration: 08:00 hrs/i);
    screen.getByText(/16:00 - 23:59/i);
    screen.getByText(/Duration: 07:59 hrs/i);
  });

  it('should call getIsOpen and toggle functions in ToggleButton site', () => {
    const getIsOpen = vi.fn();
    const toggle = vi.fn();

    renderForTesting(
      <GroupedShiftsAccordion
        id="631a2f24d227da0f33eb1ea1"
        shifts={shifts}
        sites={sites}
        days={days}
        permissions={permissions}
        dataSource={mockedDataSource}
        toggle={toggle}
        getIsOpen={getIsOpen}
        groupKey="siteId"
      />
    );

    fireEvent.click(screen.getByText(/costanera center/i));

    expect(toggle).toBeCalledTimes(1);
    expect(toggle).toBeCalledWith('631a2f24d227da0f33eb1ea1');

    expect(getIsOpen).toBeCalledTimes(2); // se llama 2 veces, la primera es cuando se renderiza el componente
    expect(getIsOpen).toBeCalledWith('631a2f24d227da0f33eb1ea1');
  });

  it('should call getIsOpen and toggle functions in ToggleButton day', () => {
    const getIsOpen = vi.fn();
    const toggle = vi.fn();

    renderForTesting(
      <GroupedShiftsAccordion
        id="631a2f24d227da0f33eb1ea1"
        shifts={shifts}
        sites={sites}
        days={days}
        permissions={permissions}
        dataSource={mockedDataSource}
        toggle={toggle}
        getIsOpen={getIsOpen}
        groupKey="siteId"
      />
    );

    fireEvent.click(screen.getByText(/monday/i));

    expect(toggle).toBeCalledTimes(1);
    expect(toggle).toBeCalledWith('631a2f24d227da0f33eb1ea10Monday');

    expect(getIsOpen).toBeCalledTimes(2); // se llama 2 veces, la primera es cuando se renderiza el componente
    expect(getIsOpen).toBeCalledWith('631a2f24d227da0f33eb1ea10Monday');
  });
});
