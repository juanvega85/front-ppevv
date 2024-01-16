import { screen, waitFor } from '@testing-library/react';
import { LoginPage } from './LoginPage';
import userEvent from '@testing-library/user-event';
import { loginResponseMock } from '../data/mocks/loginResponse.mock';
import { setTenantResponseMock } from '../data/mocks/setTenantResponse.mock';
import renderForTesting from '../utils/renderForTesting';
import { mockedDataSource } from '../data/sources/mocked';
import { vi } from 'vitest';

describe('Login page', () => {
  it('should login ok', async () => {
    const login = () => Promise.resolve({ data: loginResponseMock });
    const initSession = vi.fn();
    renderForTesting(<LoginPage dataSource={{ ...mockedDataSource, login }} initSession={initSession} />);
    userEvent.type(screen.getByLabelText('Email'), 'valid@email.com');
    userEvent.type(screen.getByLabelText('Password'), 'valid password');
    userEvent.click(screen.getByText('Enter'));

    await waitFor(() => screen.findByText(/Success login/i));
    expect(initSession).toHaveBeenCalledTimes(1);
    expect(initSession).toBeCalledWith('fakeToken', {
      email: 'test@test.com',
      firstName: 'Jhon',
      isSuperUser: false,
      lastName: 'Doe',
      permissions: setTenantResponseMock.permissions,
      roles: setTenantResponseMock.roleIds,
      tenantId: 'tenantId',
      userId: '631a2f1cd227da0f33eb1cf2',
    });
  });

  it('should display error message on fail', async () => {
    const login = () => Promise.reject(new Error('this is the error message'));
    const initSession = vi.fn();

    renderForTesting(<LoginPage dataSource={{ ...mockedDataSource, login }} initSession={initSession} />);
    userEvent.type(screen.getByLabelText('Email'), 'valid@email.com');
    userEvent.type(screen.getByLabelText('Password'), 'valid password');
    userEvent.click(screen.getByText('Enter'));

    await waitFor(() => screen.findByText(/this is the error message/i));
    expect(initSession).toHaveBeenCalledTimes(0);
  });
});
