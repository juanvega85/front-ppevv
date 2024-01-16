import { BoxTitled } from './BoxTitled';
import { render, screen } from '@testing-library/react';

describe('BoxTitled', () => {
  it('should render content', () => {
    render(
      <BoxTitled>
        <div>Content</div>
      </BoxTitled>
    );
    screen.getByText('Content');
  });

  it('should render title', () => {
    render(<BoxTitled title="Test title" />);
    screen.getByText('Test title');
  });

  it('should render title and content', () => {
    render(
      <BoxTitled title="Test title">
        <div>Content</div>
      </BoxTitled>
    );
    screen.getByText('Test title');
    screen.getByText('Content');
  });
});
