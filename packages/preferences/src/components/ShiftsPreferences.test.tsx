import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderForTesting } from '../utils/renderForTesting';
import { mockedDataSource } from '../data/sources/mocked';
import { ShiftsPreferences } from './ShiftsPreferences';

const userId = '1234567890';

describe('ShiftsPreferences', () => {
  it('should render Loader when is loading', () => {
    renderForTesting(<ShiftsPreferences type="permanent" dataSource={mockedDataSource} userId={userId} />);

    expect(screen.getAllByTestId('loader').length).toBeGreaterThan(0);
  });

  it('should render ok loading showing selected items and no render Loader', async () => {
    renderForTesting(<ShiftsPreferences type="permanent" dataSource={mockedDataSource} userId={userId} />);

    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());

    screen.getByText('Days of the week');
    screen.getByText('Shifts');

    await waitFor(() => screen.getByText('Order by sites'));

    expect(screen.getAllByText('Alejandro Fleming').length).toBe(2);
    expect(screen.getAllByText('Costanera Center').length).toBe(2);

    screen.getByText('Estadio Nacional');
    screen.getByText('Avenida Providencia');
    screen.getByText('Cristóbal Colón');
    screen.getByText('Edificio White');
    screen.getByText('Plaza Sotomayor');
    screen.getByText('Hospital Van Buren');
    screen.getByText('Viña Centro');
    screen.getByText("Plaza O'Higgins");
    screen.getByText('Los Lirios');

    expect(screen.getAllByText(/monday/i).length).toBe(3);
    expect(screen.getAllByText(/wednesday/i).length).toBe(3);
    expect(screen.getAllByText(/tuesday/i).length).toBe(1);
    expect(screen.getAllByText(/thursday/i).length).toBe(1);
    expect(screen.getAllByText(/friday/i).length).toBe(1);
    expect(screen.getAllByText(/saturday/i).length).toBe(1);
    expect(screen.getAllByText(/sunday/i).length).toBe(1);
  });

  it('should call update function with the parameters for permanent', async () => {
    const updateShiftsPreferences = vi.fn(() => Promise.resolve({ data: [] }));
    renderForTesting(<ShiftsPreferences type="permanent" dataSource={{ ...mockedDataSource, updateShiftsPreferences }} userId={userId} />);

    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
    screen.getByText('Order by sites');

    userEvent.click(screen.getByText('12:00 - 14:00'));
    await waitFor(() => userEvent.click(screen.getByText(/save/i)));

    await waitFor(() => expect(updateShiftsPreferences).toBeCalledTimes(1));
    expect(updateShiftsPreferences).toBeCalledWith({
      data: ['631a2f25d227da0f33eb1f76', '631a2f25d227da0f33eb1f8c', '631a2f25d227da0f33eb1f8b'],
      type: 'permanent',
      userId: '1234567890',
    });
    await waitFor(() => screen.getByText('Updated successfully'));
  });

  it('should call update function with the parameters for temporary', async () => {
    const updateShiftsPreferences = vi.fn(() => Promise.resolve({ data: [] }));

    renderForTesting(<ShiftsPreferences type="temporary" dataSource={{ ...mockedDataSource, updateShiftsPreferences }} userId={userId} />);
    await waitFor(() => screen.getByText('12:00 - 14:00'));

    userEvent.click(screen.getByText('12:00 - 14:00'));
    await waitFor(() => userEvent.click(screen.getByText(/save/i)));

    await waitFor(() => expect(updateShiftsPreferences).toBeCalledTimes(1));
    expect(updateShiftsPreferences).toBeCalledWith({
      data: ['631a2f25d227da0f33eb1f76', '631a2f25d227da0f33eb1f8c', '631a2f25d227da0f33eb1f8b'],
      type: 'temporary',
      userId: '1234567890',
    });
    await waitFor(() => screen.getByText('Updated successfully'));
  });
});
