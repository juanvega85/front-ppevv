import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  test('should show content', () => {
    render(
      <Footer>
        <div>content</div>
      </Footer>
    );
    screen.getByText(`content`);
  });
});
