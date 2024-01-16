import localForage from 'localforage';
import { ISession } from './types/ISession';

export const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const storeSession = (data: unknown) => {
  localForage.setItem('session', data);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getSession = () => {
  return localForage.getItem<ISession>('session');
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localForage.removeItem('session');
};

export const isSessionOpen = () => {
  const token = getToken();
  return token !== null;
};
