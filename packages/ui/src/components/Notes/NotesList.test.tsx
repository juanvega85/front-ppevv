import { NotesList } from './NotesList';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const notes = ['nota 1|19-Oct-2022 15:41:00|John Doe', 'nota 2|19-Oct-2022 16:41:00|Mary Phill', 'nota 3|19-Oct-2022 17:41:00|Kent Jhonson'];

describe('NotesList', () => {
  it('should render ok all information', () => {
    render(<NotesList data={notes} />);

    screen.getByText(/nota 1/i);
    screen.getByText(/john doe/i);
    screen.getByText(/19-Oct-2022 15:41:00/i);

    screen.getByText(/nota 2/i);
    screen.getByText(/mary phill/i);
    screen.getByText(/19-Oct-2022 16:41:00/i);

    screen.getByText(/nota 3/i);
    screen.getByText(/kent jhonson/i);
    screen.getByText(/19-Oct-2022 17:41:00/i);

    expect(screen.getAllByTestId('DeleteIcon').length).toBe(notes.length);
  });

  it('should render ok all information with readonly', () => {
    render(<NotesList data={notes} readOnly />);

    screen.getByText(/nota 1/i);
    screen.getByText(/john doe/i);
    screen.getByText(/19-Oct-2022 15:41:00/i);

    screen.getByText(/nota 2/i);
    screen.getByText(/mary phill/i);
    screen.getByText(/19-Oct-2022 16:41:00/i);

    screen.getByText(/nota 3/i);
    screen.getByText(/kent jhonson/i);
    screen.getByText(/19-Oct-2022 17:41:00/i);

    expect(screen.queryByTestId('DeleteIcon')).toBeNull();
  });

  it('should call onChange on delete item', () => {
    const callback = vi.fn();
    render(<NotesList data={notes} onChange={callback} />);

    userEvent.click(screen.queryAllByTestId('DeleteIcon')[1]);
    expect(callback).toBeCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(['nota 1|19-Oct-2022 15:41:00|John Doe', 'nota 3|19-Oct-2022 17:41:00|Kent Jhonson']);
  });
});
