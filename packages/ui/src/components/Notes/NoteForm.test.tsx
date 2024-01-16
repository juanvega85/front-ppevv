import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderForTesting from '../../utils/renderForTesting';
import { NoteForm } from './NoteForm';
import { vi } from 'vitest';

describe('NoteForm', () => {
  it('should render ok', () => {
    renderForTesting(<NoteForm />);

    screen.getByLabelText(/new note/i);

    expect(screen.getByText(/add/i)).toHaveProperty('disabled', true);
  });

  it('should enable button on type', () => {
    renderForTesting(<NoteForm />);

    userEvent.type(screen.getByLabelText(/new note/i), 'Test note');

    expect(screen.getByText(/add/i)).toHaveProperty('disabled', false);
  });

  it('should call onAdd', async () => {
    const callback = vi.fn();
    renderForTesting(<NoteForm onAdd={callback} authorName="Jhon Doe" />);

    userEvent.type(screen.getByLabelText(/new note/i), 'Test note');
    userEvent.click(screen.getByText(/add/i));

    expect(callback).toBeCalledTimes(1);
    expect(callback).toBeCalledWith(expect.stringMatching(/test note/i));
    expect(callback).toBeCalledWith(expect.stringMatching(/jhon doe/i));
  });
});
