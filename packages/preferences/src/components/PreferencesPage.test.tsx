import { screen, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { renderForTesting } from '../utils/renderForTesting';
import { PreferencesPage } from './PreferencesPage';

const sites = [
  'Alejandro Fleming',
  'Avenida Providencia',
  'Caracol Ñuñoa',
  'Costanera Center',
  'Cristóbal Colón',
  'Edificio White',
  'El Colorado',
  'Estadio Nacional',
  'Hospital Van Buren',
  'Los Lirios',
  "Plaza O'Higgins",
  'Plaza Sotomayor',
  'Viña Centro',
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

describe('PreferencesPage', () => {
  it('should return null if does not exist user id', () => {
    renderForTesting(<PreferencesPage dataSource={mockedDataSource} />);

    expect(screen.queryByText('My preferences')).toBeNull();
  });

  it('should return page ok', async () => {
    renderForTesting(<PreferencesPage dataSource={mockedDataSource} userId="62abdd8e89d5bc0ffc129116" />);

    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());

    screen.getByText('My preferences');
    for (const site of sites) {
      screen.getByText(site);
    }
    for (const day of days) {
      screen.getByText(day);
    }
    screen.getByText('Order by sites');
    screen.getByText('Order by days');
    screen.getByText('Previous');
    screen.getByText('Next');
    screen.getByText('Save');
  });
});
