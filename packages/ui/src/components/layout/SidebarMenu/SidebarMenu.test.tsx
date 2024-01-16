import { screen, waitFor } from '@testing-library/react';
import { it } from 'vitest';
import renderForTesting from '../../../utils/renderForTesting';
import { SidebarMenu } from './SidebarMenu';
import { DesktopMacTwoTone } from '@ppe/icons';
import { IMenuList } from '../../../types/IMenuList';
import userEvent from '@testing-library/user-event';

const items: IMenuList[] = [
  {
    title: 'General',
    items: [
      {
        text: 'Home',
      },
    ],
  },
  {
    title: 'Mantencion',
    items: [
      {
        text: 'Programacion',
        subItems: [
          {
            text: 'Retroalimentacion',
            path: '/path3',
            icon: DesktopMacTwoTone,
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        text: 'Activities',
        path: '/activities',
        hidden: true,
      },
    ],
  },
];

describe('Sidebar Menu', () => {
  it('should render menu, subheaders menu, item dropdown and logo', () => {
    renderForTesting(<SidebarMenu items={items} logo={'assets/logo.svg'} />);

    screen.getByText(/general/i);
    screen.getByText(/home/i);
    screen.getByText(/mantencion/i);
    screen.getByText(/programacion/i);
    screen.getByAltText('logo');
  });

  it('should render only items visible', () => {
    renderForTesting(<SidebarMenu items={items} />);

    screen.getByText(/general/i);
    screen.getByText(/home/i);
    screen.getByText(/mantencion/i);
    screen.getByText(/programacion/i);
    expect(screen.queryByText(/activities/i)).toBeNull();
  });

  it('should open and close collapse', async () => {
    renderForTesting(<SidebarMenu items={items} />);

    const parent = screen.getByText(/programacion/i);

    userEvent.click(parent);
    await waitFor(() => screen.getByText(/Retroalimentacion/i));
    screen.getByTestId('DesktopMacTwoToneIcon');

    userEvent.click(parent);
    await waitFor(() => expect(screen.queryByText(/Retroalimentacion/i)).toBeNull());
    expect(screen.queryByTestId('DesktopMacTwoToneIcon')).toBeNull();
  });
});
