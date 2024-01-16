import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';

describe('SideBar', () => {
  test('should render text', () => {
    render(<Sidebar>Text content</Sidebar>);
    screen.getByText(/Text content/i);
  });
  test('should render component', () => {
    render(
      <Sidebar>
        <div>Component</div>
      </Sidebar>
    );
    screen.getByText(/Component/i);
  });
});
