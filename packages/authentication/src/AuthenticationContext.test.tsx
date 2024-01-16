import { AuthenticationProvider, useAuthentication } from './';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ISession } from './types/ISession';

const TestComponent = () => {
  const { isAuthenticated } = useAuthentication();
  return <>{isAuthenticated ? 'authenticated' : 'non-authenticated'}</>;
};

const TestLogin = () => {
  const { initSession } = useAuthentication();
  const session: ISession = {
    firstName: 'John',
    lastName: 'Doe',
    tenantId: '123456',
    userId: '1234567890',
    permissions: [],
    roles: [],
    email: 'jhon@email.com',
    isSuperUser: false,
  };

  return <button onClick={() => initSession('1234567890', session)}>login</button>;
};

const TestLogout = () => {
  const { closeSession } = useAuthentication();
  return <button onClick={closeSession}>logout</button>;
};

describe('AuthenticationContext', () => {
  it('should be non-authenticated by default', async () => {
    render(
      <AuthenticationProvider>
        <TestComponent />
      </AuthenticationProvider>
    );
    await waitFor(() => screen.getByText('non-authenticated'));
  });

  it('should authenticated after login', async () => {
    render(
      <AuthenticationProvider>
        <TestComponent />
        <TestLogin />
      </AuthenticationProvider>
    );
    await act(async () => {
      userEvent.click(screen.getByText('login'));
    });
    screen.getByText('authenticated');
  });

  it('should logout after login', async () => {
    render(
      <AuthenticationProvider>
        <TestComponent />
        <TestLogin />
        <TestLogout />
      </AuthenticationProvider>
    );
    await act(async () => {
      userEvent.click(screen.getByText('login'));
    });
    await act(async () => {
      userEvent.click(screen.getByText('logout'));
    });
    await waitFor(() => screen.getByText('non-authenticated'));
  });
});
