import { describe, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderForTesting from '../../utils/renderForTesting';
import { SplitButton } from './SplitButton';

const options = ['Save this', 'Save serie'];

describe('SplitButton', () => {
  it('should render button', () => {
    renderForTesting(<SplitButton options={options} />);

    screen.getByText('Save this');
    screen.getByTestId('ArrowDropDownIcon');
    expect(screen.queryByText('Save serie')).toBeNull();
  });

  it('should render button disabled', () => {
    renderForTesting(<SplitButton options={options} disabled />);

    expect(screen.getByText('Save this')).toHaveProperty('disabled', true);

    const arrowButton = screen.getByTestId('ArrowDropDownIcon');
    expect(arrowButton.closest('button')).toHaveProperty('disabled', true);
  });

  it('should render button loading', () => {
    renderForTesting(<SplitButton options={options} loading />);

    screen.getByRole('progressbar');
    expect(screen.getByText('Save this')).toHaveProperty('disabled', true);

    const arrowButton = screen.getByTestId('ArrowDropDownIcon');
    expect(arrowButton.closest('button')).toHaveProperty('disabled', true);
  });

  it('should change the option button', async () => {
    renderForTesting(<SplitButton options={options} />);

    screen.getByText('Save this');
    expect(screen.queryByText('Save serie')).toBeNull();

    userEvent.click(screen.getByTestId('ArrowDropDownIcon'));
    screen.getByText('Save serie');
    userEvent.click(screen.getByText('Save serie'));

    await waitFor(() => screen.getByText('Save serie'));
    expect(screen.queryByText('Save this')).toBeNull();
  });

  it('should call onClick function', async () => {
    const onClick = vi.fn();
    renderForTesting(<SplitButton options={options} onClick={onClick} />);

    userEvent.click(screen.getByText('Save this'));

    expect(onClick).toBeCalledTimes(1);
    expect(onClick).toBeCalledWith('Save this');
  });
});
