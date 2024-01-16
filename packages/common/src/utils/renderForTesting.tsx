import React from 'react';
import { render } from '@testing-library/react';
import { ToastsProvider, ThemeProvider, createTheme } from '@ppe/ui';
import { MemoryRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@ppe/data-provider';
import { TranslationsProvider } from '@ppe/translation';
import i18n from '../../i18nForTests';

const theme = createTheme({});
const queryClient = new QueryClient();

const renderForTesting = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <TranslationsProvider i18n={i18n}>
          <ToastsProvider />
          <Router>{ui}</Router>
        </TranslationsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default renderForTesting;
