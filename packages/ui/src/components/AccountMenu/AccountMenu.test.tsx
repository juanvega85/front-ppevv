import { screen, waitFor } from '@testing-library/react';
import renderForTesting from '../../utils/renderForTesting';
import { AccountMenu } from './AccountMenu';
import userEvent from '@testing-library/user-event';

const items = [
  {
    text: 'Profile',
    path: '/profile',
  },
];

describe('AccountMenu', () => {
  it('should render name and default icon and no render loader', async () => {
    renderForTesting(<AccountMenu userName="Jhon Doe" />);

    screen.getByText(/jhon doe/i);
    screen.getByTestId('PersonIcon');
    expect(screen.queryByAltText('avatar')).toBeNull();
    expect(screen.queryByTestId('loader')).toBeNull();
  });

  it('should render image', () => {
    renderForTesting(<AccountMenu avatarUrl="https://e.rpp-noticias.io/normal/2022/07/20/090009_1288015.jpg" />);

    screen.getByAltText('avatar');
    expect(screen.queryByTestId('PersonIcon')).toBeNull();
  });

  it('should render menu on click default avatar', async () => {
    renderForTesting(<AccountMenu items={items} />);

    expect(screen.queryByText('profile')).toBeNull();

    const avatar = screen.getByTestId(/PersonIcon/i);
    await userEvent.click(avatar);

    await waitFor(() => expect(screen.getByText(/profile/i)));
  });

  it('should render menu on click image avatar', async () => {
    renderForTesting(<AccountMenu avatarUrl="https://e.rpp-noticias.io/normal/2022/07/20/090009_1288015.jpg" items={items} />);

    expect(screen.queryByText('profile')).toBeNull();

    const avatar = screen.getByAltText('avatar');
    await userEvent.click(avatar);

    await waitFor(() => expect(screen.getByText(/profile/i)));
  });

  it('should render loader', async () => {
    renderForTesting(<AccountMenu isLoading />);

    screen.getByTestId('loader');
  });
});
