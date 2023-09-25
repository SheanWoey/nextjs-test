'use client';

import { Metadata } from 'next';
import ProductsByCategory from './product-lists';

// utils
// sections
// ----------------------------------------------------------------------

type Props = {
  params: {
    handle: string;
  };
};

export default function ProductCategoriesPage({ params }: Props) {
  const { handle } = params;

  return <ProductsByCategory handle={handle} />;
}
