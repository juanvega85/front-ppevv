import renderForTesting from '../../utils/renderForTesting';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';
import { screen, waitFor } from '@testing-library/react';
import { vi, describe, it } from 'vitest';

describe('LoginForm', () => {
  it('should render ok', () => {
    renderForTesting(<LoginForm />);

    screen.getByLabelText('Email');
    screen.getByLabelText('Password');
    screen.getByText('Enter');
  });

  it('should render error messages on try to send with empty fields', async () => {
    renderForTesting(<LoginForm />);

    userEvent.click(screen.getByText('Enter'));

    await waitFor(() => expect(screen.getAllByText(/required/i).length).toBe(2));
  });

  it('should render error messages on input wrong email', async () => {
    renderForTesting(<LoginForm />);

    userEvent.type(screen.getByLabelText('Email'), 'test');
    userEvent.click(screen.getByText('Enter'));

    await waitFor(() => screen.getByText(/Email must be valid/i));
  });

  it('should call onSend function when all fields are ok', async () => {
    const callback = vi.fn();
    renderForTesting(<LoginForm onSend={callback} />);

    userEvent.type(screen.getByLabelText('Email'), 'valid@email.com');
    userEvent.type(screen.getByLabelText('Password'), 'valid password');
    userEvent.click(screen.getByText('Enter'));

    await waitFor(() => expect(callback).toBeCalledTimes(1));

    expect(callback).toBeCalledWith({
      email: 'valid@email.com',
      password: 'valid password',
    });
  });
});
