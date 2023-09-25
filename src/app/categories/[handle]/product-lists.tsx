import { useProductCategories, useProducts } from 'medusa-react';
import { Box, Container, Pagination, Typography } from '@mui/material';
import { LoadingScreen } from 'src/components/loading-screen';
import { ProductItemSkeleton } from 'src/app/(root)/products/[handle]/product-skeleton';
import ProductItem from './product-item';

type Props = {
  handle: string;
};

const ProductsByCategory = ({ handle }: Props) => {
  const { product_categories, isLoading: isCategoriesLoading } = useProductCategories({
    handle,
  });
  const { isLoading, products: productsFilter } = useProducts({
    category_id: [product_categories?.[0]?.id || ''],
  });

  if (isLoading || isCategoriesLoading) {
    return <LoadingScreen />;
  }

  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>{productsFilter?.map((product) => <ProductItem key={product.id} product={product} />)}</>
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        mb: 15,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Shop
      </Typography>

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
      >
        {isLoading ? renderSkeleton : renderList}
      </Box>

      {productsFilter && productsFilter.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
          }}
        />
      )}
    </Container>
  );
};

export default ProductsByCategory;
