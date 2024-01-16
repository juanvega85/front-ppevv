/* eslint-disable react/display-name */
import React from 'react';
import { QueryClient, QueryClientProvider } from '@ppe/data-provider';
import { TranslationsProvider } from '@ppe/translation';
import i18n from '../../i18nForTests';

interface Props {
  children: React.ReactNode;
}

export const getReactQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: Props) => (
    <TranslationsProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TranslationsProvider>
  );
};
