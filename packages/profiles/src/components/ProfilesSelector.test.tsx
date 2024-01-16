import { ProfilesSelector } from './ProfilesSelector';
import { screen } from '@testing-library/react';
import { profilesMock } from '../data/mocks/profiles.mock';
import userEvent from '@testing-library/user-event';
import { renderForTesting } from '../utils/renderForTesting';
import { vi } from 'vitest';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';

const data = getProfilesHydrated(profilesMock.data).slice(0, 3);

describe('ProfilesSelector', () => {
  it('should render ok', () => {
    renderForTesting(<ProfilesSelector data={data} />);
    screen.getByText(/Paul Zoulin/i);
    screen.getByText(/Maria De Los Angeles Ibañez Alvarez/i);
    screen.getByText(/Enrique Müller/i);
    screen.getByText(/Drag and drop here selected profiles/i);
  });

  it('should select item', async () => {
    const callback = vi.fn();
    renderForTesting(<ProfilesSelector data={data} onChange={callback} />);

    let addButtons = screen.getAllByTestId('PersonAddAlt1Icon');
    expect(addButtons.length).toBe(3);

    let removeButtons = screen.queryAllByTestId('BackspaceIcon');
    expect(removeButtons.length).toBe(0);

    userEvent.click(addButtons[0]);
    screen.getByText(/Paul Zoulin/i);
    screen.getByText(/Maria De Los Angeles Ibañez Alvarez/i);
    screen.getByText(/Enrique Müller/i);
    expect(callback).toBeCalledWith(['62abdd8e89d5bc0ffc129116']);

    userEvent.click(addButtons[1]);
    expect(callback).toBeCalledWith(['62abdd8e89d5bc0ffc129116', '62b1d75b036b920314d4b836']);

    addButtons = screen.getAllByTestId('PersonAddAlt1Icon');
    expect(addButtons.length).toBe(1);

    removeButtons = screen.getAllByTestId('BackspaceIcon');
    expect(removeButtons.length).toBe(2);
    expect(screen.queryByText(/Drag and drop here selected profiles/i)).toBeNull();
  });

  it('should remove item', async () => {
    const callback = vi.fn();
    renderForTesting(<ProfilesSelector data={data} onChange={callback} />);

    const addButtons = screen.getAllByTestId('PersonAddAlt1Icon');

    userEvent.click(addButtons[0]);

    const removeButtons = screen.getAllByTestId('BackspaceIcon');
    userEvent.click(removeButtons[0]);
    expect(callback).toBeCalledWith([]);
    screen.getByText(/Drag and drop here selected profiles/i);
  });

  it('should filter', async () => {
    renderForTesting(<ProfilesSelector data={data} filter="paul" />);

    screen.getByText(/Paul Zoulin/i);
    expect(screen.queryByText(/Maria De Los Angeles Ibañez Alvarez/i)).toBeNull();
    expect(screen.queryByText(/Enrique Müller/i)).toBeNull();
  });
});
