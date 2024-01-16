import AppRouter from 'routes/AppRouter';
import theme from 'theme';
import { AuthenticationProvider } from '@ppe/authentication';
import { ToastsProvider, ThemeProvider } from '@ppe/ui';
import 'react-toastify/dist/ReactToastify.min.css';
import { DataProvider } from 'DataContext';
import { apiDataSource } from 'data/sources/api';
import { mockedDataSource } from 'data/sources/mocked';
import 'i18n';

const API_URL = import.meta.env.VITE_API_URL;

const dataSource = import.meta.env.VITE_DATA_SOURCE === 'mocked' ? mockedDataSource : apiDataSource(API_URL);

const App = () => {
  return (
    <AuthenticationProvider>
      <ThemeProvider theme={theme}>
        <ToastsProvider />
        <DataProvider source={dataSource}>
          <AppRouter />
        </DataProvider>
      </ThemeProvider>
    </AuthenticationProvider>
  );
};

export default App;
