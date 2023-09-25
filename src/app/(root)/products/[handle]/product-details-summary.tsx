import { useCallback, useMemo } from 'react';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// routes
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { LineItem, ProductOption } from '@medusajs/medusa';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// utils
// components
import Iconify from 'src/components/iconify';
// types
//
import { useProductActions } from 'src/hooks/useProduct';
import useProductPrice from 'src/hooks/useProductPrice';
import OptionSelect from 'src/components/optionSelect';
import IncrementerButton from './incrementer-button';

// ----------------------------------------------------------------------

type Props = {
  product: PricedProduct;
  items?: LineItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: LineItem) => void;
};

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const router = useRouter();

  const {
    maxQuantityMet,
    variant,
    addToCart,
    options,
    updateOptions,
    increaseQuantity,
    decreaseQuantity,
    quantity,
  } = useProductActions();

  const { title, subtitle } = product;

  const price = useProductPrice({ id: product.id!, variantId: variant?.id });
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price;

    return variantPrice || cheapestPrice || null;
  }, [price]);

  const maxQuantity = variant?.inventory_quantity || 0;

  const onBuyNow = async () => {
    try {
      if (variant) {
        addToCart();
      }

      onGotoStep?.(0);
      router.push(paths.checkout);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = useCallback(() => {
    try {
      addToCart();
    } catch (error) {
      console.error(error);
    }
  }, [addToCart]);

  const renderPrice = (
    <Box sx={{ typography: 'h5' }}>
      {selectedPrice?.price_type === 'sale' && (
        <Box
          component="span"
          sx={{
            color: 'text.disabled',
            textDecoration: 'line-through',
            mr: 0.5,
          }}
        >
          {selectedPrice.original_price}
        </Box>
      )}
      {selectedPrice?.calculated_price}
    </Box>
  );

  // const renderShare = (
  //   <Stack direction="row" spacing={3} justifyContent="center">
  //     <Link
  //       variant="subtitle2"
  //       sx={{
  //         color: 'text.secondary',
  //         display: 'inline-flex',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Iconify icon="mingcute:add-line" width={16} sx={{ mr: 1 }} />
  //       Compare
  //     </Link>

  //     <Link
  //       variant="subtitle2"
  //       sx={{
  //         color: 'text.secondary',
  //         display: 'inline-flex',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Iconify icon="solar:heart-bold" width={16} sx={{ mr: 1 }} />
  //       Favorite
  //     </Link>

  //     <Link
  //       variant="subtitle2"
  //       sx={{
  //         color: 'text.secondary',
  //         display: 'inline-flex',
  //         alignItems: 'center',
  //       }}
  //     >
  //       <Iconify icon="solar:share-bold" width={16} sx={{ mr: 1 }} />
  //       Share
  //     </Link>
  //   </Stack>
  // );

  const renderOption = (option: ProductOption) => (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        {option.title}
      </Typography>

      <OptionSelect option={option} current={options[option.id]} updateOption={updateOptions} />
    </Stack>
  );

  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={quantity}
          disabledDecrease={quantity <= 1}
          disabledIncrease={quantity > maxQuantity}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {maxQuantity}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={maxQuantityMet || disabledActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to Cart
      </Button>

      <Button
        fullWidth
        size="large"
        onClick={onBuyNow}
        variant="contained"
        disabled={disabledActions}
      >
        Buy Now
      </Button>
    </Stack>
  );

  const renderSubtitle = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subtitle}
    </Typography>
  );

  // const renderRating = (
  //   <Stack
  //     direction="row"
  //     alignItems="center"
  //     sx={{
  //       color: 'text.disabled',
  //       typography: 'body2',
  //     }}
  //   >
  //     <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
  //     {`(${fShortenNumber(totalReviews)} reviews)`}
  //   </Stack>
  // );

  // const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
  //   <Stack direction="row" alignItems="center" spacing={1}>
  //     {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
  //     {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
  //   </Stack>
  // );

  const renderInventoryType = (
    <Box
      component="span"
      sx={{
        typography: 'overline',
        color:
          (maxQuantity === 0 && 'error.main') ||
          (maxQuantity < 5 && 'warning.main') ||
          'success.main',
      }}
    >
      {maxQuantity === 0 && 'Out of stock'}
      {maxQuantity < 5 && maxQuantity > 0 && 'Low stock'}
    </Box>
  );

  return (
    <Stack spacing={3} sx={{ pt: 3 }} {...other}>
      <Stack spacing={2} alignItems="flex-start">
        {/* {renderLabels} */}

        {variant && renderInventoryType}

        <Typography variant="h5">{title}</Typography>

        {/* {renderRating} */}

        {variant && renderPrice}

        {renderSubtitle}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {(product.options || []).map((option) => renderOption(option))}

      {/* {renderColorOptions} */}

      {/* {renderSizeOptions} */}

      {variant && renderQuantity}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {variant && renderActions}

      {/* {renderShare} */}
    </Stack>
  );
}
