'use client';

import { CartProvider } from 'medusa-react';
import { StoreProvider } from 'src/hooks/useStore';
import MainLayout from 'src/layouts/main';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <CartProvider>
      <StoreProvider>
        <MainLayout>{children}</MainLayout>;
      </StoreProvider>
    </CartProvider>
  );
}
