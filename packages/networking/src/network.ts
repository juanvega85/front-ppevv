import axios from 'axios';
import { getToken, storeToken, clearSession } from '@ppe/authentication';

const networkingInit = (url: string) => {
  const instance = axios.create({
    baseURL: url,
    responseType: 'json',
  });

  instance.interceptors.request.use(
    (_config) => {
      const config = _config;
      if (config.headers) {
        config.headers.Authorization = `Bearer ${getToken()}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      const isTokenExpired = error && error.response && error.response.status === 401;
      const isTryingAgain = originalRequest.retry || originalRequest.url === '/authentication/renew';

      if ((isTokenExpired && isTryingAgain) || !error.response || error.response.status !== 401) {
        if ((isTokenExpired && isTryingAgain) || error.response.status === 403) {
          clearSession();
          document.location.href = '/?relogin=true';
          return null;
        }
        return Promise.reject(error);
      }

      originalRequest.retry = true;

      if (originalRequest.headers.Authorization) {
        return instance
          .post('/authentication/renew')
          .then((responseRenew) => {
            if (responseRenew.status === 200) {
              storeToken(responseRenew.data.token);
              return instance(originalRequest);
            }
            return Promise.reject(error);
          })
          .catch(() => {
            clearSession();
            document.location.href = '/?relogin=true';
          });
      }
      clearSession();
      return null;
    }
  );

  return instance;
};

export default networkingInit;
