import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { sitesMock } from '@ppe/sites';
import { mockedDataSource } from '../data/sources/mocked';
import { vi } from 'vitest';
import { renderForTesting } from '../utils/renderForTesting';
import { ShiftForm } from './ShiftForm';

const data = sitesMock.data.sites.slice(0, 3);

describe('ShiftForm', () => {
  it('should render buttons sites and days', () => {
    renderForTesting(<ShiftForm sites={data} dataSource={mockedDataSource} />);

    // 3 sites with 3 buttons map, 7 buttons of weekdays and 1 button create
    expect(screen.getAllByRole('button').length).toBe(data.length * 2 + 7 + 1);
  });

  it('should render site button active when the sites length is 1', () => {
    const sitesData = sitesMock.data.sites.splice(0, 1);
    const { container } = renderForTesting(<ShiftForm sites={sitesData} dataSource={mockedDataSource} />);

    const activeButton = container.querySelectorAll('.toggleActive');

    expect(activeButton.length).toBe(sitesData.length);
  });

  it('should call onCloseDialog function', () => {
    const callback = vi.fn();
    renderForTesting(<ShiftForm sites={data} onCloseDialog={callback} dataSource={mockedDataSource} />);

    userEvent.click(screen.getByText(/cancel/i));
    expect(callback).toBeCalledTimes(1);
  });

  it('should render create button disabled when the sites and days button are not selected', () => {
    renderForTesting(<ShiftForm sites={data} dataSource={mockedDataSource} />);

    expect(screen.getByText(/create/i)).toHaveProperty('disabled', true);
  });

  it('should render create button disabled when the hours and minutes duration less than 1', () => {
    renderForTesting(<ShiftForm sites={data} dataSource={mockedDataSource} />);

    userEvent.click(screen.getByText('Costanera Center'));
    userEvent.click(screen.getByText('Monday'));

    expect(screen.getByText(/create/i)).toHaveProperty('disabled', true);
  });

  it('should set value 0 when the hours or minutes duration time less than 0', () => {
    renderForTesting(<ShiftForm sites={data} dataSource={mockedDataSource} />);

    userEvent.type(screen.getByLabelText(/hours/i), '-2');
    userEvent.type(screen.getByLabelText(/minutes/i), '-2');

    expect(screen.getByLabelText<HTMLInputElement>(/hours/i).value).toBe('0');
    expect(screen.getByLabelText<HTMLInputElement>(/minutes/i).value).toBe('0');
  });

  it('should set value 0 when the hours duration time is greate than 23 or minutes duration time is greater than 59', () => {
    renderForTesting(<ShiftForm sites={data} dataSource={mockedDataSource} />);

    userEvent.type(screen.getByLabelText(/hours/i), '26');
    userEvent.type(screen.getByLabelText(/minutes/i), '60');

    expect(screen.getByLabelText<HTMLInputElement>(/hours/i).value).toBe('0');
    expect(screen.getByLabelText<HTMLInputElement>(/minutes/i).value).toBe('0');
  });

  it('should show error message when the start time is less than the minimum hours', () => {
    renderForTesting(<ShiftForm sites={data} dataSource={mockedDataSource} />);

    // minimum hours is 05:00
    userEvent.type(screen.getByLabelText(/Start time/i), '04:00');

    screen.getByText(/Start time must be greater than 05:00 or equal/i);
  });

  it('should render confirm dialog when form are be ok', () => {
    renderForTesting(<ShiftForm sites={data} dataSource={mockedDataSource} />);

    userEvent.click(screen.getByText('Costanera Center'));
    userEvent.click(screen.getByText('Monday'));
    userEvent.type(screen.getByLabelText(/hours/i), '2');

    userEvent.click(screen.getByText(/create/i));

    screen.getByText(/new shifts will be created/i);
  });

  it('should callback createShift when form are be ok', async () => {
    const createShifts = vi.fn(() => Promise.resolve({ data: { shifts: [], _sites: {}, _profiles: {}, _teams: {} } }));
    renderForTesting(<ShiftForm sites={data} dataSource={{ ...mockedDataSource, createShifts }} />);

    userEvent.click(screen.getByRole('button', { name: 'Costanera Center' }));
    userEvent.click(screen.getByRole('button', { name: 'Monday' }));
    userEvent.type(screen.getByLabelText(/hours/i), '2');

    userEvent.click(screen.getByText(/create/i));

    userEvent.click(screen.getByText(/yes, i am sure/i));

    await waitFor(() => screen.getAllByText('New shifts have been created successfully'));

    expect(createShifts).toBeCalledTimes(1);

    expect(createShifts).toHaveBeenCalledWith([
      {
        day: '0Monday',
        site: {
          id: '631a2f24d227da0f33eb1ea1',
        },
        startTime: '05:00',
        duration: '02:00',
        active: true,
      },
    ]);
  });
});
