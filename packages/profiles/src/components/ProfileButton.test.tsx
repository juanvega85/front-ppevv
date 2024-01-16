import { ProfileButton } from './ProfileButton';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderForTesting } from '../utils/renderForTesting';
import { profilesMock } from '../data/mocks/profiles.mock';
import { IProfile } from '../types/IProfile';

const dataMale = profilesMock.data.profiles[0] as IProfile;

const dataFemale = profilesMock.data.profiles[1] as IProfile;

describe('ProfileButton', () => {
  it('should render button for male profile', () => {
    renderForTesting(<ProfileButton data={dataMale} />);
    screen.getByText('Paul Zoulin');
    screen.getByText('Team: Inglesa Viña del Mar');
    screen.getByTestId('ManIcon');
  });

  it('should render button for female profile', () => {
    renderForTesting(<ProfileButton data={dataFemale} />);
    screen.getByText('Maria De Los Angeles Ibañez Alvarez');
    screen.getByText('Team: Alcántara');
    screen.getByTestId('WomanIcon');
  });

  it('should render full information with personal tab by default', () => {
    renderForTesting(<ProfileButton data={dataMale} />);

    userEvent.click(screen.getByText('Paul Zoulin'));

    screen.getByText(/personal information/i);
    screen.getByText(/theocratic information/i);

    screen.getByText(/email/i);
    screen.getByText(/toochevere@gmail.com/i);
  });

  it('should render theocratic information', () => {
    renderForTesting(<ProfileButton data={dataMale} />);

    userEvent.click(screen.getByText('Paul Zoulin'));

    userEvent.click(screen.getByText(/theocratic information/i));
    screen.getAllByText(/team/i);
    screen.getByText(/baptism date/i);
  });

  it('should close modal', () => {
    renderForTesting(<ProfileButton data={dataMale} />);

    userEvent.click(screen.getByText('Paul Zoulin'));

    screen.getByText(/personal information/i);
    screen.getByText(/theocratic information/i);

    userEvent.click(screen.getByTestId('CloseIcon'));

    waitFor(() => {
      expect(screen.queryByText(/personal information/i)).toBeNull();
      expect(screen.queryByText(/theocratic information/i)).toBeNull();
    });
  });
});
