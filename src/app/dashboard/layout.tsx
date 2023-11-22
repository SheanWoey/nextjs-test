'use client';

import { CartProvider } from 'medusa-react';
// auth
import { AuthGuard } from 'src/auth/guard';
import { StoreProvider } from 'src/hooks/useStore';
// components
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <CartProvider>
        <StoreProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </StoreProvider>
      </CartProvider>
    </AuthGuard>
  );
}
