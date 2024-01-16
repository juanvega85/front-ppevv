import renderForTesting from '../../utils/renderForTesting';
import userEvent from '@testing-library/user-event';
import { ResetPasswordForm } from './ResetPasswordForm';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

const callRequest = vi.fn();

describe('Reset Password Form', () => {
  beforeEach(() => {
    renderForTesting(<ResetPasswordForm onSend={callRequest} isLoading={false} />);
  });

  it('should render reset password form', () => {
    screen.getByLabelText('Email');
    screen.getByLabelText('Password');
    screen.getByLabelText('Confirm Password');
    screen.getByRole('button', { name: 'Save password' });
  });

  it('should display error messages when clicked on button and the inputs are empty', async () => {
    userEvent.click(screen.getByText('Save password'));

    await waitFor(() => {
      expect(screen.getAllByText('Required field').length).toBe(3);
    });
  });

  it('should display error messages when clicked on button and passwords does not match', async () => {
    userEvent.type(screen.getByLabelText('Email'), 'email@business.com');
    userEvent.type(screen.getByLabelText('Password'), 'Clave123');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'Slave123');

    userEvent.click(screen.getByText('Save password'));

    await waitFor(() => screen.getByText('Passwords does not match'));
  });

  it('should display error message Email must be valid', async () => {
    userEvent.type(screen.getByLabelText('Email'), 'emailbusiness.com');
    userEvent.type(screen.getByLabelText('Password'), 'Clave123');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'Clave123');

    userEvent.click(screen.getByText('Save password'));

    await waitFor(() => screen.getByText('Email must be valid'));
  });

  it('should display visual password validator when sent form and password have an errors', async () => {
    userEvent.type(screen.getByLabelText('Email'), 'emailbusiness.com');
    userEvent.type(screen.getByLabelText('Password'), 'clave123');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'clave123');

    userEvent.click(screen.getByText('Save password'));

    await waitFor(() => screen.getByText('At least one uppercase letter'));
  });

  it('should sent form when inputs are ok', async () => {
    userEvent.type(screen.getByLabelText('Email'), 'email@business.com');
    userEvent.type(screen.getByLabelText('Password'), 'Pass1234');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'Pass1234');

    userEvent.click(screen.getByText('Save password'));

    await waitFor(() => expect(callRequest).toBeCalledTimes(1));
    expect(callRequest).toBeCalledWith({
      email: 'email@business.com',
      password: 'Pass1234',
    });
  });
});
