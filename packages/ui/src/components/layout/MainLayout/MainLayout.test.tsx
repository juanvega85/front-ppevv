import { render, screen } from '@testing-library/react';
import { MainLayout } from './MainLayout';
import { Apple as AppleIcon } from '@ppe/icons';

describe('MainLayout', () => {
  test('should render app name and sidebar component', () => {
    const sidebar = (
      <>
        <AppleIcon />
        Menu item
      </>
    );
    render(<MainLayout appTitle="Test name" sidebar={sidebar} footer={<>footer content</>} />);
    screen.getByText(/Menu item/i);
    screen.getByTestId('AppleIcon');
    screen.getByText(/test name/i);
    screen.getByText(/footer content/i);
  });

  test('should render children', () => {
    render(<MainLayout appTitle="Test name">Test content</MainLayout>);
    screen.getByText('Test content');
  });

  test('should render version', () => {
    render(
      <MainLayout appTitle="Test name" version="12345">
        Test content
      </MainLayout>
    );

    screen.getByText('12345');
  });
});
