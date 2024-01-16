import { render, screen } from '@testing-library/react';
import { InfoLinkField } from './InfoLinkField';

describe('InfoLinkField', () => {
  it('should render ok', () => {
    render(<InfoLinkField label="Test label" text="Test content" link="mailto:test@test.com" />);
    screen.getByText('Test label');
    screen.getByText('Test content');
    expect(screen.getByRole('link')).toHaveProperty('href', 'mailto:test@test.com');
    expect(screen.getByRole('link')).toHaveProperty('target', '_blank');
  });
});
