import React from 'react';
import { isSessionOpen, storeToken, clearSession, getSession, storeSession } from './session';
import { ISession } from './types/ISession';

interface IAuthContext {
  isAuthenticated: boolean;
  initSession: (token: string, data: ISession) => void;
  closeSession: () => void;
  session: ISession | null;
}

const initValue: IAuthContext = {
  isAuthenticated: false,
  initSession: () => {},
  closeSession: () => {},
  session: null,
};

const AuthContext = React.createContext<IAuthContext>(initValue);

interface Props {
  children: React.ReactNode;
}

export const AuthenticationProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(isSessionOpen());
  const [session, setSession] = React.useState<ISession | null>(null);

  const initSession = React.useCallback((token: string, data: ISession) => {
    storeToken(token);
    storeSession(data);
    setSession(data);
    setIsAuthenticated(true);
  }, []);

  React.useEffect(() => {
    const fetchSession = async () => {
      const value = await getSession();
      setSession(value);
    };

    fetchSession();
  }, []);

  const closeSession = React.useCallback(() => {
    clearSession();
    setIsAuthenticated(false);
  }, []);

  const value = {
    initSession,
    closeSession,
    isAuthenticated,
    session,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthentication = () => {
  return React.useContext(AuthContext);
};
