import { screen, waitFor } from '@testing-library/react';
import renderForTesting from '../utils/renderForTesting';
import { mockedDataSource } from '../data/sources/mocked';
import { RecoverPasswordPage } from './RecoverPasswordPage';
import { Routes } from '../routes';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const apiKey = '1234';

vi.mock('../components/RecoverPasswordForm/ReCaptcha', () => {
  return {
    default: ({ onChange }: { onChange: (token: string | null) => void }) => {
      return <button onClick={() => onChange('12345678')}>I am not a robot</button>;
    },
  };
});

describe('RecoverPasswordPage', () => {
  it('should render page', () => {
    renderForTesting(<RecoverPasswordPage dataSource={mockedDataSource} apiKeyRecaptcha={apiKey} />);

    screen.getByLabelText(/email/i);
    screen.getByRole('button', { name: 'Recover password' });
    screen.getByText('Back to login');
    expect(screen.getByText('Back to login').getAttribute('href')).toBe(Routes.LOGIN);
  });

  it('should call recoverPassword function success', async () => {
    const recoverPassword = vi.fn(() => Promise.resolve());
    renderForTesting(<RecoverPasswordPage dataSource={{ ...mockedDataSource, recoverPassword }} apiKeyRecaptcha={apiKey} />);

    userEvent.type(screen.getByLabelText(/email/i), 'test@email.com');
    userEvent.click(screen.getByText('I am not a robot'));
    userEvent.click(screen.getByText('Recover password'));

    await waitFor(() => screen.getByText('Check your email'));
    expect(recoverPassword).toBeCalledTimes(1);
    expect(recoverPassword).toBeCalledWith({ email: 'test@email.com' });
  });

  it('should call recoverPassword function error', async () => {
    const recoverPassword = vi.fn(() => Promise.reject(new Error('Test error')));
    renderForTesting(<RecoverPasswordPage dataSource={{ ...mockedDataSource, recoverPassword }} apiKeyRecaptcha={apiKey} />);

    userEvent.type(screen.getByLabelText(/email/i), 'test@email.com');
    userEvent.click(screen.getByText('I am not a robot'));
    userEvent.click(screen.getByText('Recover password'));

    await waitFor(() => screen.getByText('Test error'));
    expect(recoverPassword).toBeCalledTimes(1);
    expect(recoverPassword).toBeCalledWith({ email: 'test@email.com' });
  });
});
