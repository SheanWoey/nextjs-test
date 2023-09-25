// @mui
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
// routes
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { useCart } from 'medusa-react';
import { useMemo } from 'react';
import { RouterLink } from 'src/routes/components';
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { findPriceRange } from 'src/utils/price';
import { Variant } from 'src/types/medusa';

type Props = {
  product: PricedProduct;
};

export default function ProductItem({ product }: Props) {
  const { cart } = useCart();

  const formattedPrice = useMemo(() => {
    if (product.variants && cart?.region) {
      return findPriceRange(product.variants as Variant[], cart?.region);
    }
    return 'N/A';
  }, [product.variants, cart]);

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      {!!product.status && (
        <Link
          component={RouterLink}
          href={`/products/${product.handle}`}
          color="inherit"
          variant="subtitle2"
          noWrap
        >
          <Fab
            color="warning"
            size="medium"
            className="add-cart-btn"
            sx={{
              right: 16,
              bottom: 16,
              zIndex: 9,
              opacity: 0,
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('all', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <Iconify icon="solar:cart-plus-bold" width={24} />
          </Fab>
        </Link>
      )}

      <Tooltip title={!product.status && 'Out of stock'} placement="bottom-end">
        <Image
          src={product.thumbnail || '/logo/logo_single.png'}
          ratio="1/1"
          sx={{
            borderRadius: 1.5,
            opacity: 0.48,
            filter: 'grayscale(1)',
          }}
        />
      </Tooltip>
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link
        component={RouterLink}
        href={`/products/${product.handle}`}
        color="inherit"
        variant="subtitle2"
        noWrap
      >
        {product.title}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          {product.discountable && (
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {formattedPrice}
            </Box>
          )}

          <Box component="span">{formattedPrice}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      {renderImg}

      {renderContent}
    </Card>
  );
}
