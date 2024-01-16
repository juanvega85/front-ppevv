import { screen } from '@testing-library/react';
import { shiftsMock } from '../data/mocks/shifts.mock';
import { sitesMock } from '@ppe/sites';
import userEvent from '@testing-library/user-event';
import { mockedDataSource } from '../data/sources/mocked';
import { ShiftsList } from './ShiftsList';
import { renderForTesting } from '../utils/renderForTesting';
import { IPermissions } from '@ppe/authentication';

const permissions: IPermissions = {
  canCreate: true,
  canRead: true,
  canUpdate: true,
  canDelete: true,
};

const { shifts } = shiftsMock.data;
const { sites } = sitesMock.data;

describe('ShiftsList', () => {
  it('should render all sites', () => {
    renderForTesting(<ShiftsList shifts={shifts} sites={sites} dataSource={mockedDataSource} permissions={permissions} />);

    screen.getByText(/costanera center/i);
    screen.getByText(/alejandro fleming/i);
    screen.getByText(/caracol ñuñoa/i);
    screen.getByText(/estadio nacional/i);

    expect(screen.queryAllByRole('button', { expanded: false }).length).toBe(4); // all sites closed
    expect(screen.queryAllByRole('button', { expanded: true }).length).toBe(0); // none opened

    expect(screen.getAllByText(/Duration:/i).length).toBe(shifts.length);
  });

  it('should expand site to show days', async () => {
    renderForTesting(<ShiftsList shifts={shifts} sites={sites} dataSource={mockedDataSource} permissions={permissions} />);

    await userEvent.click(screen.getByText(/costanera center/i));

    expect(screen.getAllByRole('button', { expanded: true }).length).toBe(1); // costanera center
    expect(screen.getAllByRole('button', { expanded: false }).length).toBe(10); // 3 closed sites + 7 inner closed days
  });

  it('should expand days', async () => {
    renderForTesting(<ShiftsList shifts={shifts} sites={sites} dataSource={mockedDataSource} permissions={permissions} />);

    userEvent.click(screen.getByText(/costanera center/i));
    userEvent.click(screen.getAllByText(/monday/i)[0]);

    expect(screen.getAllByRole('button', { expanded: true }).length).toBe(2); // costanera center + monday
    expect(screen.getAllByRole('button', { expanded: false }).length).toBe(9); // 3 closed sites + 6 inner closed days
  });

  it('should render all days', () => {
    renderForTesting(<ShiftsList shifts={shifts} sites={sites} dataSource={mockedDataSource} permissions={permissions} />);
    userEvent.click(screen.getByLabelText(/order by days/i));

    screen.getByText(/monday/i);
    screen.getByText(/tuesday/i);
    screen.getByText(/wednesday/i);
    screen.getByText(/thursday/i);
    screen.getByText(/friday/i);
    screen.getByText(/saturday/i);
    screen.getByText(/sunday/i);

    expect(screen.getAllByRole('button', { expanded: false }).length).toBe(7); // all days closed
    expect(screen.queryAllByRole('button', { expanded: true }).length).toBe(0); // none opened

    expect(screen.getAllByText(/Duration:/i).length).toBe(shifts.length);
  });

  it('should expand day to show sites', async () => {
    renderForTesting(<ShiftsList shifts={shifts} sites={sites} dataSource={mockedDataSource} permissions={permissions} />);

    userEvent.click(screen.getByLabelText(/order by days/i));
    userEvent.click(screen.getAllByText(/monday/i)[0]);

    expect(screen.getAllByRole('button', { expanded: true }).length).toBe(1); // monday
    expect(screen.getAllByRole('button', { expanded: false }).length).toBe(8); // 6 closed days + 2 inner closed sites
  });

  it('should expand sites', async () => {
    renderForTesting(<ShiftsList shifts={shifts} sites={sites} dataSource={mockedDataSource} permissions={permissions} />);

    userEvent.click(screen.getByLabelText(/order by days/i));

    userEvent.click(screen.getAllByText(/monday/i)[0]);
    userEvent.click(screen.getAllByText(/costanera center/i)[0]);

    expect(screen.getAllByRole('button', { expanded: true }).length).toBe(2); // monday + costaner center
    expect(screen.getAllByRole('button', { expanded: false }).length).toBe(7); // 6 closed days + 1 inner closed site
  });
});
