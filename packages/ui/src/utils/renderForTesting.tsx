import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemoryRouter as Router } from 'react-router-dom';
import { TranslationsProvider } from '@ppe/translation';
import i18n from '../../i18nForTests';

const theme = createTheme({});

const renderForTesting = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <TranslationsProvider i18n={i18n}>
        <Router>{ui}</Router>
      </TranslationsProvider>
    </ThemeProvider>
  );
};

export default renderForTesting;
