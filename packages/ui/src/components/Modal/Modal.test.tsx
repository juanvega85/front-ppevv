import { Modal } from './Modal';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Modal', () => {
  it('should not render', () => {
    render(<Modal title="test title">Content</Modal>);

    expect(screen.queryByText('test title')).toBeNull();
    expect(screen.queryByText('Content')).toBeNull();
    expect(screen.queryByTestId('CloseIcon')).toBeNull();
  });

  it('should render', () => {
    render(
      <Modal open title="test title">
        Content
      </Modal>
    );

    screen.getByRole('dialog');
    screen.queryByText('test title');
    screen.queryByText('Content');
  });

  it('should call onClose', () => {
    const callback = vi.fn();
    render(
      <Modal open title="test title" onClose={callback}>
        Content
      </Modal>
    );

    userEvent.click(screen.getByTestId('CloseIcon'));
    expect(callback).toBeCalledTimes(1);
  });

  it('should render headerless', () => {
    const callback = vi.fn();
    render(
      <Modal open title="test title" onClose={callback} headerless>
        Content
      </Modal>
    );

    screen.getByRole('dialog');
    screen.queryByText('test title');
    screen.queryByText('Content');
    expect(screen.queryByTestId('CloseIcon')).toBeNull();
  });
});
