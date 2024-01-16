import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Notes } from './Notes';
import renderForTesting from '../../utils/renderForTesting';
import { vi } from 'vitest';

const data = ['nota 1|19-Oct-2022 15:41:00|John Doe', 'nota 2|19-Oct-2022 16:41:00|Mary Phill', 'nota 3|19-Oct-2022 17:41:00|Kent Jhonson'];

describe('Notes', () => {
  it('should render ok without notes', () => {
    renderForTesting(<Notes />);

    waitFor(() => screen.getByLabelText(/new note/i));
    screen.getByText(/add/i);
  });

  it('should render ok with notes', async () => {
    renderForTesting(<Notes data={data} />);

    await waitFor(() => screen.getByLabelText(/new note/i));
    screen.getByText(/add/i);

    screen.getByText(/nota 1/i);
    screen.getByText(/john doe/i);
    screen.getByText(/19-Oct-2022 15:41:00/i);

    screen.getByText(/nota 2/i);
    screen.getByText(/mary phill/i);
    screen.getByText(/19-Oct-2022 16:41:00/i);

    screen.getByText(/nota 3/i);
    screen.getByText(/kent jhonson/i);
    screen.getByText(/19-Oct-2022 17:41:00/i);

    expect(screen.getAllByTestId('DeleteIcon').length).toBe(data.length);
  });

  it('should not render Delete buttons on readOnly mode', () => {
    renderForTesting(<Notes data={data} readOnly />);

    expect(screen.queryByTestId('DeleteIcon')).toBeNull();
  });

  it('should call onChange on add new', async () => {
    const callback = vi.fn();
    renderForTesting(<Notes onChange={callback} />);

    await waitFor(() => screen.getByLabelText(/new note/i));
    userEvent.type(screen.getByLabelText(/new note/i), 'Test note');
    userEvent.click(screen.getByText(/add/i));

    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith([expect.stringMatching(/test note/i)]);
  });

  it('should call onChange on remove', () => {
    const callback = vi.fn();
    renderForTesting(<Notes data={data} onChange={callback} />);

    userEvent.click(screen.queryAllByTestId('DeleteIcon')[1]);

    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith(['nota 1|19-Oct-2022 15:41:00|John Doe', 'nota 3|19-Oct-2022 17:41:00|Kent Jhonson']);
  });
});
