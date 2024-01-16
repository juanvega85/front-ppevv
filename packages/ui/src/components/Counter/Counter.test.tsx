import { screen } from '@testing-library/react';
import { Counter } from './Counter';
import userEvent from '@testing-library/user-event';
import renderForTesting from '../../utils/renderForTesting';

describe('Counter', () => {
  it('render ok with label and starts on zero', () => {
    renderForTesting(<Counter label="Test label" />);

    screen.getByText(/test label/i);
    screen.getByTestId('RemoveCircleIcon');
    screen.getByTestId('AddCircleIcon');
    screen.getByText('0');
  });

  it('render ok without label starts on zero', () => {
    renderForTesting(<Counter />);

    screen.getByTestId('RemoveCircleIcon');
    screen.getByTestId('AddCircleIcon');
    screen.getByText('0');
  });

  it('increases and decreases correctly', () => {
    renderForTesting(<Counter />);

    const plus = screen.getByTestId('AddCircleIcon');
    const minus = screen.getByTestId('RemoveCircleIcon');
    userEvent.click(plus);
    screen.getByText('1');
    userEvent.click(minus);
    screen.getByText('0');
    userEvent.click(minus);
    screen.getByText('0');
    userEvent.click(plus);
    userEvent.click(plus);
    screen.getByText('2');
  });
});
