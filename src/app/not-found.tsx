// sections
import { Metadata } from 'next';
import { NotFoundView } from 'src/sections/error';
import ClientLayout from './useClientLayout';

// ----------------------------------------------------------------------

export const metadata : Metadata  = {
  title: '404 Page Not Found!',
};

export default function NotFoundPage() {
  return <ClientLayout><NotFoundView /></ClientLayout>;
}
