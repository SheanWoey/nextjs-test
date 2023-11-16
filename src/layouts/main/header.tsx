// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';
// hooks
import { useProductCategories } from 'medusa-react';
import { useMemo } from 'react';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgBlur } from 'src/theme/css';
// components
import Logo from 'src/components/logo';
import Label from 'src/components/label';
//
import Iconify from 'src/components/iconify';
import convertCategoryToNav from 'src/utils/convertCategoryToNav';
import { HEADER } from '../config-layout';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
//
import { HeaderShadow, LoginButton } from '../_common';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const { isLoading, product_categories } = useProductCategories({
    parent_category_id: 'null',
  });

  const navConfig = useMemo(() => {
    if (!product_categories) {
      return [
        {
          title: 'Home',
          path: '/',
          icon: <Iconify icon="mdi:home-outline" />,
        },
        {
          title: 'Shop',
          path: '/shop',
          icon: <Iconify icon="mdi:shopping-cart-outline" />,
          children: [],
        },
      ];
    }

    return [
      {
        title: 'Home',
        path: '/',
        icon: <Iconify icon="mdi:home-outline" />,
      },
      {
        ...convertCategoryToNav(product_categories),
      },
    ];
  }, [product_categories]);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            badgeContent={
              <Link href="/" target="_blank" rel="noopener" underline="none" sx={{ ml: 1 }}>
                <Label color="info" sx={{ textTransform: 'unset', height: 22, px: 0.5 }}>
                  v5.4.0
                </Label>
              </Link>
            }
          >
            <Logo />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} data={navConfig} isLoading={isLoading} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {mdUp && <LoginButton />}

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
