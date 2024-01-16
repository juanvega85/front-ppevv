import { describe, it, expect, vi } from 'vitest';
import { ContactForm } from './ContactForm';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderForTesting from '../../utils/renderForTesting';

describe('ContactForm', () => {
  it('shoud render ok', () => {
    renderForTesting(<ContactForm />);
    const fields = ['Name *', 'Last Name *', 'Email *', 'Phone *', 'Subject *', 'Message'];

    fields.forEach((item) => {
      screen.getByLabelText(item);
    });
  });

  it('should show warning messages when try to send with empty fields', async () => {
    const onSend = vi.fn();
    renderForTesting(<ContactForm onSend={onSend} />);

    fireEvent.click(screen.getByText('send message'));

    await waitFor(() => expect(screen.getAllByText(/required field/i).length).toBe(5));
  });

  it('should show warning message when the input email value be incorrect', async () => {
    const onSend = vi.fn();
    renderForTesting(<ContactForm onSend={onSend} />);

    const inputName = screen.getByLabelText('Email *');
    await userEvent.type(inputName, 'este es mi correo');
    await userEvent.click(screen.getByText('send message'));

    await waitFor(() => screen.getByText('Email must be valid'));
  });

  it('should show success message on sent', async () => {
    const onSend = vi.fn();
    renderForTesting(<ContactForm onSend={onSend} />);

    userEvent.type(screen.getByLabelText('Name *'), 'Joe');
    userEvent.type(screen.getByLabelText('Last Name *'), 'Doe');
    userEvent.type(screen.getByLabelText('Email *'), 'hola@test.com');
    userEvent.type(screen.getByLabelText('Phone *'), '12345678');
    userEvent.type(screen.getByLabelText('Subject *'), 'Prueba');
    userEvent.type(screen.getByLabelText('Message'), 'Mensaje');

    userEvent.click(screen.getByText('send message'));

    await waitFor(() => expect(onSend).toBeCalledTimes(1));
    expect(onSend).toBeCalledWith({
      email: 'hola@test.com',
      lastName: 'Doe',
      message: 'Mensaje',
      name: 'Joe',
      phone: '12345678',
      subject: 'Prueba',
    });
  });
});
