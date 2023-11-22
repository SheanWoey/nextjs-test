// @mui
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
// routes
// import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  totalItems: number;
};

export default function CartIcon({ totalItems }: Props) {
  return (
    <Box
      component={RouterLink}
      href={paths.user.cart}
      sx={{
        cursor: 'pointer',
        color: 'text.primary',
        padding: (theme) => theme.spacing(1, 3, 1, 0),
        transition: (theme) => theme.transitions.create(['opacity']),
        '&:hover': { opacity: 0.72 },
      }}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={24} />
      </Badge>
    </Box>
  );
}
