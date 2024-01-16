import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme, ToastsProvider } from '@ppe/ui';
import { TranslationsProvider } from '@ppe/translation';
import { QueryClient, QueryClientProvider } from '@ppe/data-provider';
import i18n from '../../i18nForTests';

const theme = createTheme({});
const queryClient = new QueryClient();

export const renderForTesting = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <TranslationsProvider i18n={i18n}>
          <ToastsProvider />
          {ui}
        </TranslationsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
