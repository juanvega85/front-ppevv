import React from 'react';
import { IDataSource } from 'data/IDataSource';
import { QueryClient, QueryClientProvider } from '@ppe/data-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const DataContext = React.createContext<unknown>(null);

interface Props {
  source: IDataSource;
  children: React.ReactNode;
}

export const DataProvider = ({ source, children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={source}>{children}</DataContext.Provider>
    </QueryClientProvider>
  );
};

export const useData = () => {
  return React.useContext(DataContext) as IDataSource;
};
