import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderForTesting } from '../utils/renderForTesting';
import { ShiftsSelector } from './ShiftsSelector';
import { vi } from 'vitest';
import { shiftsMock } from '../data/mocks/shifts.mock';
import { sitesMock } from '@ppe/sites';

const { shifts } = shiftsMock.data;
const { sites } = sitesMock.data;

describe('ShiftsSelector', () => {
  it('should render ok by default (ordered by sites)', () => {
    renderForTesting(<ShiftsSelector data={shifts} selected={[]} onChange={() => {}} sites={sites} />);

    screen.getByText('Order by sites');
    screen.getByText('Order by days');

    screen.getByText('Costanera Center');
    screen.getByText('Alejandro Fleming');
    screen.getByText('Caracol Ñuñoa');
    screen.getByText('Estadio Nacional');

    expect(screen.queryByText('Avenida Providencia')).toBeNull();
    expect(screen.queryByText('Cristóbal Colón')).toBeNull();
    expect(screen.queryByText('El Colorado')).toBeNull();
    expect(screen.queryByText('Edificio White')).toBeNull();
    expect(screen.queryByText('Plaza Sotomayor')).toBeNull();
    expect(screen.queryByText('Hospital Van Buren')).toBeNull();
    expect(screen.queryByText('Viña Centro')).toBeNull();
    expect(screen.queryByText("Plaza O'Higgins")).toBeNull();
    expect(screen.queryByText('Los Lirios')).toBeNull();

    expect(screen.getAllByText(/monday/i).length).toBe(2);
    expect(screen.getAllByText(/tuesday/i).length).toBe(1);
    expect(screen.getAllByText(/wednesday/i).length).toBe(4);
    expect(screen.getAllByText(/thursday/i).length).toBe(1);
    expect(screen.getAllByText(/friday/i).length).toBe(1);
    expect(screen.getAllByText(/saturday/i).length).toBe(2);
    expect(screen.getAllByText(/sunday/i).length).toBe(1);
  });

  it('should render ok ordered by days', () => {
    renderForTesting(<ShiftsSelector data={shifts} selected={[]} onChange={() => {}} sites={sites} />);

    screen.getByText('Order by sites');
    screen.getByText('Order by days');

    userEvent.click(screen.getByText('Order by days'));

    screen.getByText(/monday/i);
    screen.getByText(/tuesday/i);
    screen.getByText(/wednesday/i);
    screen.getByText(/thursday/i);
    screen.getByText(/friday/i);
    screen.getByText(/saturday/i);
    screen.getByText(/sunday/i);

    expect(screen.getAllByText('Costanera Center').length).toBe(7);
    expect(screen.getAllByText('Alejandro Fleming').length).toBe(3);
    expect(screen.getAllByText('Caracol Ñuñoa').length).toBe(1);
    expect(screen.getAllByText('Estadio Nacional').length).toBe(1);
    expect(screen.queryByText('Avenida Providencia')).toBeNull();
    expect(screen.queryByText('Cristóbal Colón')).toBeNull();
    expect(screen.queryByText('El Colorado')).toBeNull();
    expect(screen.queryByText('Edificio White')).toBeNull();
    expect(screen.queryByText('Plaza Sotomayor')).toBeNull();
    expect(screen.queryByText('Hospital Van Buren')).toBeNull();
    expect(screen.queryByText('Viña Centro')).toBeNull();
    expect(screen.queryByText("Plaza O'Higgins")).toBeNull();
    expect(screen.queryByText('Los Lirios')).toBeNull();
  });

  it('should render call onChange to activate shift', () => {
    const callback = vi.fn();
    renderForTesting(<ShiftsSelector data={shifts} selected={[]} onChange={callback} sites={sites} />);

    userEvent.click(screen.getByText('10:30 - 13:30'));

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('632893eed227da0f33eb21b9', true);
  });

  it('should render call onChange to deactivate shift', () => {
    const callback = vi.fn();
    renderForTesting(<ShiftsSelector data={shifts} selected={['632893eed227da0f33eb21b9']} onChange={callback} sites={sites} />);

    userEvent.click(screen.getByText('10:30 - 13:30'));

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith('632893eed227da0f33eb21b9', false);
  });
});
