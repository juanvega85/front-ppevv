import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from './LanguageSwitcher';
import renderForTesting from '../../utils/renderForTesting';

const languages = [
  {
    id: 'en',
    name: 'English',
  },
  {
    id: 'es',
    name: 'Español',
  },
];

describe('Language Switcher', () => {
  it('should render switcher', () => {
    renderForTesting(<LanguageSwitcher languages={languages} />);
    screen.getByLabelText(/language/i);
    screen.getByText(/english/i);
  });

  it('should change language', async () => {
    renderForTesting(<LanguageSwitcher languages={languages} />);

    userEvent.click(screen.getByLabelText(/language/i));
    userEvent.click(screen.getByRole('option', { name: /Español/i }));

    await waitFor(() => screen.getByLabelText('Idioma'));
  });
});
