// sections
import { Metadata } from 'next';
import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Jwt: Login',
};

export default function LoginPage() {
  return <JwtLoginView />;
}
