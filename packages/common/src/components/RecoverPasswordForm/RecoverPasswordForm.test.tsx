import renderForTesting from '../../utils/renderForTesting';
import userEvent from '@testing-library/user-event';
import { RecoverPasswordForm } from './RecoverPasswordForm';
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

const apiKey = '1234';

vi.mock('./ReCaptcha', () => {
  return {
    default: ({ onChange }: { onChange: (token: string | null) => void }) => {
      return <button onClick={() => onChange('12345678')}>I am not a robot</button>;
    },
  };
});

describe('Recover Form', () => {
  it('should render recover form', () => {
    renderForTesting(<RecoverPasswordForm apiKey={apiKey} />);

    screen.getByLabelText(/email/i);
    screen.getByRole('button', { name: 'Recover password' });
  });

  it('should show error message when click button and input email and captcha are empty', async () => {
    renderForTesting(<RecoverPasswordForm apiKey={apiKey} />);
    userEvent.click(screen.getByText('Recover password'));

    await waitFor(() => {
      screen.getByText('Required field');
      screen.getByText('Please verify that you are a human');
    });
  });

  it('should show error message when click button and input wrong email', async () => {
    renderForTesting(<RecoverPasswordForm apiKey={apiKey} />);

    userEvent.type(screen.getByLabelText('Email'), 'invalid email');
    userEvent.click(screen.getByText('Recover password'));

    await waitFor(() => screen.getByText('Email must be valid'));
  });

  it('should call onSend when click button and input correct email and captcha', async () => {
    const callback = vi.fn();
    renderForTesting(<RecoverPasswordForm apiKey={apiKey} onSend={callback} />);

    userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
    userEvent.click(screen.getByText('I am not a robot'));
    userEvent.click(screen.getByText('Recover password'));

    await waitFor(() => expect(callback).toBeCalledTimes(1));
    expect(callback).toBeCalledWith({ email: 'test@test.com' });
  });
});
