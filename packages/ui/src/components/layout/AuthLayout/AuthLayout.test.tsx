import { render, screen } from '@testing-library/react';
import { AuthLayout } from './AuthLayout';

describe('AuthLayout', () => {
  test('should render layout with app name in footer and in box', () => {
    render(<AuthLayout appName="Test name" />);
    screen.getByText(/test name/i);
  });

  test('should render image', () => {
    render(<AuthLayout logo="some image" />);
    screen.getByAltText('logo');
  });

  test('should render children', () => {
    render(<AuthLayout appName="Test name">Test content</AuthLayout>);
    screen.getByText(/test content/i);
  });

  test('should render footer', () => {
    render(<AuthLayout appName="Test name" footer={<>footer content</>} />);
    screen.getByText(/footer content/i);
  });

  test('should render version', () => {
    render(<AuthLayout version="12345" />);

    screen.getByText('12345');
  });
});
