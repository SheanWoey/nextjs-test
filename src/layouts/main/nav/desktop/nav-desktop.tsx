// @mui
import Stack from '@mui/material/Stack';
//
import { NavProps } from '../types';
import NavList from './nav-list';
import { Searchbar } from 'src/layouts/_common';

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
