import { fireEvent, screen } from '@testing-library/react';
import { Home as HomeIcon } from '@ppe/icons';
import renderForTesting from '../../../utils/renderForTesting';
import MenuItem from './MenuItem';

describe('MenuItem', () => {
  it('should render menu item without sub items', () => {
    const item = {
      text: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon,
      hidden: false,
    };

    renderForTesting(<MenuItem item={item} />);

    screen.getByText(/dashboard/i);
    screen.getByTestId(/homeicon/i);

    const link = screen.getByText(/dashboard/i).closest('a')!;
    expect(link.getAttribute('href')).toBe('/dashboard');
  });

  it('should not render menu item', () => {
    const item = {
      text: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon,
      hidden: true,
    };

    renderForTesting(<MenuItem item={item} />);

    expect(screen.queryByText(/dashboard/i)).toBeNull();
    expect(screen.queryByTestId(/homeicon/i)).toBeNull();
  });

  it('should render menu item with sub item but without icon', () => {
    const item = {
      text: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon,
      hidden: false,
      subItems: [
        {
          text: 'About',
          path: '/about',
          hidden: false,
        },
      ],
    };

    renderForTesting(<MenuItem item={item} />);

    screen.getByText(/dashboard/i);
    screen.getByTestId(/homeicon/i);
    expect(screen.queryByText(/About/i)).toBeNull();

    fireEvent.click(screen.getByText(/dashboard/i));

    screen.getByText(/About/i);
    expect(screen.getAllByTestId(/homeicon/i).length).toBe(1);

    const linkSubItem = screen.getByText(/About/i).closest('a')!;
    expect(linkSubItem.getAttribute('href')).toBe('/about');
  });

  it('should render menu item active', async () => {
    const item = {
      text: 'Dashboard',
      path: '/dashboard',
      icon: HomeIcon,
      hidden: false,
    };

    const { container } = renderForTesting(<MenuItem item={item} />);
    let activeItem = container.querySelector('.activeClass');

    expect(activeItem).toBeNull();

    fireEvent.click(screen.getByText(/dashboard/i));
    activeItem = container.querySelector('.activeClass');

    expect(activeItem).not.toBeNull();
  });
});
