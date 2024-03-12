import { FC, Fragment } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import ProductCard0 from "components/product-cards/product-card-0";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
// CUSTOM DATA MODEL

// ========================================================
type Props = { products: PricedProduct[] };
// ========================================================

const ProductsGridView: FC<Props> = ({ products }) => {


  return (
    <Fragment>
      <Grid container spacing={3}>
        {products?.map((item: PricedProduct) => {

          return <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard0
              item={item}/>
          </Grid>
          })}
      </Grid>

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination
          count={Math.ceil(products.length / 10)}
          variant="outlined"
          color="primary"
        />
      </FlexBetween>
    </Fragment>
  );
};

export default ProductsGridView;
