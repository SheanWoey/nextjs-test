'use client';

import { Metadata } from 'next';
import ProductsByCategory from './product-lists';

// utils
// sections
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Product Page',
};

type Props = {
  params: {
    handle: string;
  };
};

export default function ProductCategoriesPage({ params }: Props) {
  const { handle } = params;

  return <ProductsByCategory handle={handle} />;
}
