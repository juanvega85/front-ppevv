import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderForTesting from '../../utils/renderForTesting';
import { vi } from 'vitest';
import { SelectMultiple } from './SelectMultiple';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '6', label: 'Option 6' },
];

describe('SelectMultiple', () => {
  it('should render ok with options', () => {
    renderForTesting(<SelectMultiple label="Multiple" name="multiple" options={options} />);

    userEvent.click(screen.getByLabelText('Multiple'));

    for (const option of options) {
      screen.getByText(option.label);
    }
  });

  it('should show error message when helperText exist', () => {
    const errorMsg = 'Cant be empty';
    renderForTesting(<SelectMultiple helperText={errorMsg} />);

    screen.getByText(errorMsg);
  });

  it('Should render the options selected', async () => {
    const selected = ['1', '2', '3'];
    renderForTesting(<SelectMultiple value={selected} options={options} />);

    screen.getByText('Option 1');
    screen.getByText('Option 2');
    screen.getByText('Option 3');
    // se obtienen todos los buttons que hay menos 1 button que es el input select
    expect(screen.getAllByRole('button').length - 1).toBe(selected.length);
  });

  it('Should clear value when reset is greather than 0', async () => {
    const selected = ['1', '2', '3'];
    renderForTesting(<SelectMultiple value={selected} options={options} reset={1} />);

    expect(screen.getAllByRole('button').length).toBe(1);
  });

  it('Should call request when select option and remove option selected form options rendered', () => {
    const callback = vi.fn();
    renderForTesting(<SelectMultiple label="Multiple" name="multiple" options={options} onChange={callback} />);

    userEvent.click(screen.getByLabelText('Multiple'));
    userEvent.click(screen.getByText('Option 1'));

    // 1 llamado en el primer render y 1 llamado al seleccionar una opcion
    expect(callback).toBeCalledTimes(2);
    expect(callback).toBeCalledWith(['1']);

    expect(screen.getAllByRole('option').length).toBe(options.length - 1);
    expect(screen.queryByRole('option', { name: 'Option 1' })).toBeNull();
  });

  it('Should delete option selected', () => {
    const selected = ['1', '2', '3'];
    renderForTesting(<SelectMultiple value={selected} options={options} />);

    userEvent.click(screen.getAllByTestId('CancelIcon')[0]);

    screen.getByText('Option 2');
    screen.getByText('Option 3');
    // se obtienen todos los buttons que hay menos 1 button que es el input select y se compara con selected length - 1 que se elimino
    expect(screen.getAllByRole('button').length - 1).toBe(selected.length - 1);
  });
});
