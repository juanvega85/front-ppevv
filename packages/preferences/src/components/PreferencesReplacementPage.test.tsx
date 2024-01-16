import { screen, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { renderForTesting } from '../utils/renderForTesting';
import { PreferencesReplacementPage } from './PreferencesReplacementPage';

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

describe('PreferencesReplacementPage', () => {
  it('should return null if does not exist user id', () => {
    renderForTesting(<PreferencesReplacementPage dataSource={mockedDataSource} />);

    expect(screen.queryByText('My availability for replacements')).toBeNull();
  });

  it('should return page ok', async () => {
    renderForTesting(<PreferencesReplacementPage dataSource={mockedDataSource} userId="62abdd8e89d5bc0ffc129116" />);

    await waitFor(() => expect(screen.queryByTestId('loader')).toBeNull());
    screen.getByText('My availability for replacements');
    screen.getByLabelText('Enabled');
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
