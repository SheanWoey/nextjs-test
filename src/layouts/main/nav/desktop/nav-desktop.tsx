// @mui
import Stack from '@mui/material/Stack';
//
import { Searchbar } from 'src/layouts/_common';
import { NavProps } from '../types';
import NavList from './nav-list';

// ----------------------------------------------------------------------

export default function NavDesktop({ offsetTop, data, isLoading }: NavProps) {
  return (
    <Stack component="nav" direction="row" spacing={5} sx={{ mr: 2.5, height: 1 }}>
      <Searchbar />

      {data.map((link) => (
        <NavList key={link.title} item={link} offsetTop={offsetTop} isLoading={isLoading} />
      ))}
    </Stack>
  );
}
