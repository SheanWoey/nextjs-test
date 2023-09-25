'use client';

import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MedusaProvider } from 'medusa-react';
import { SnackbarProvider } from 'src/components/snackbar';
import { MEDUSA_BACKEND_URL } from 'src/config-global';
import ClientLayout from './useClientLayout';

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export default function ClientsideLayout({ children }: Props) {
  return (
    <MedusaProvider queryClientProviderProps={{ client: queryClient }} baseUrl={MEDUSA_BACKEND_URL}>
      <SnackbarProvider>
        <ClientLayout>{children}</ClientLayout>
      </SnackbarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </MedusaProvider>
  );
}
