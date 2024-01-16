import { TextFieldMask } from './TextFieldMask';
import { screen } from '@testing-library/react';
import renderForTesting from '../../utils/renderForTesting';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('TextFieldMask', () => {
  it('should render ok with mask', () => {
    const regex = /(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/;
    const callback = vi.fn();
    renderForTesting(<TextFieldMask label="Cellphone" mask={regex} prefix="56 9" onChange={callback} />);
    screen.getByLabelText(/cellphone/i);
    userEvent.type(screen.getByLabelText(/cellphone/i), '12345678');
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith('56 9 1234 5678');
  });

  it('should render ok with another mask', () => {
    const regex = /(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/;
    const callback = vi.fn();
    renderForTesting(<TextFieldMask label="Cellphone" mask={regex} prefix="56" onChange={callback} />);
    screen.getByLabelText(/cellphone/i);
    userEvent.type(screen.getByLabelText(/cellphone/i), '123456789');
    expect(callback).toBeCalled();
    expect(callback).toBeCalledWith('56 1 2345 6789');
  });
});
