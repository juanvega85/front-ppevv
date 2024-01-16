import { render, screen } from '@testing-library/react';
import { InfoField } from './InfoField';

describe('InfoField', () => {
  it('should show single text', () => {
    render(<InfoField label="Test label" text="Test content" />);
    screen.getByText('Test label');
    screen.getByText('Test content');
  });

  it('should show text array', () => {
    render(<InfoField label="Test label" text={['Item 1', 'Item 2', 'Item 3']} />);
    screen.getByText('Test label');
    screen.getByText(/item 1/i);
    screen.getByText(/item 2/i);
    screen.getByText(/item 3/i);
  });
});
