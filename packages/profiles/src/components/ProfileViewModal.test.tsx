import { fireEvent, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { profilesMock } from '../data/mocks/profiles.mock';
import { getProfilesHydrated } from '../utils/getProfilesHydrated';
import { renderForTesting } from '../utils/renderForTesting';
import { ProfileViewModal } from './ProfileViewModal';

const profileWithoutPhone = getProfilesHydrated(profilesMock.data)[0];
const profileWithPhone = getProfilesHydrated(profilesMock.data)[1];
const handleClose = vi.fn();

describe('ProfileViewModal', () => {
  it('should no render modal when open is false', () => {
    renderForTesting(<ProfileViewModal data={profileWithoutPhone} open={false} handleClose={handleClose} />);

    expect(screen.queryByTestId('CloseIcon')).toBeNull();
  });

  it('should render modal when open is true and tab personal information is open by default', () => {
    renderForTesting(<ProfileViewModal data={profileWithPhone} open handleClose={handleClose} />);

    screen.getByTestId('CloseIcon');
    screen.getByText('Personal information');
    screen.getByText('Theocratic information');
    screen.getByText('Email');
    screen.getByText('Gender');
    screen.getByText('Marital status');
    screen.getByText('Birthdate');
    screen.getByText('Address');
    screen.getByText('Mobile phone');
    screen.getByText('Landline phone');
  });

  it('should no render info phone when profile no have phone', () => {
    renderForTesting(<ProfileViewModal data={profileWithoutPhone} open handleClose={handleClose} />);

    expect(screen.queryByText('Mobile phone')).toBeNull();
    expect(screen.queryByText('Landline phone')).toBeNull();
  });

  it('should change tab', () => {
    renderForTesting(<ProfileViewModal data={profileWithoutPhone} open handleClose={handleClose} />);

    screen.getByText('Email'); // info from default tab

    fireEvent.click(screen.getByText('Theocratic information'));

    expect(screen.queryByText('Email')).toBeNull();
    screen.getByText('Team');
    screen.getByText('Baptism date');
    screen.getByText('Service capacity');
    screen.getByText('Appointed capacity');
    screen.getByText('Languages');
  });

  it('should render data in Personal information default tab', () => {
    renderForTesting(<ProfileViewModal data={profileWithoutPhone} open handleClose={handleClose} />);

    screen.getByText('Paul Zoulin');
    screen.getByText('toochevere@gmail.com');
    screen.getByText('Male');
  });

  it('should render data in Theocratic information tab', () => {
    renderForTesting(<ProfileViewModal data={profileWithoutPhone} open handleClose={handleClose} />);

    fireEvent.click(screen.getByText('Theocratic information'));

    screen.getByText('Elder');
    screen.getByText('RegularPioneer');
  });

  it('should call handleClose function when click close button', () => {
    renderForTesting(<ProfileViewModal data={profileWithoutPhone} open={true} handleClose={handleClose} />);

    fireEvent.click(screen.getByTestId('CloseIcon'));

    expect(handleClose).toBeCalledTimes(1);
  });
});
