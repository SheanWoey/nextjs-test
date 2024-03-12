import { FC } from "react";
import Pagination from "@mui/material/Pagination";
// GLOBAL CUSTOM COMPONENTS
import { Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { ProductCard9 } from "components/product-cards/product-card-9";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
// CUSTOM DATA MODEL

// ==========================================================
type Props = { products: PricedProduct[] };
// ==========================================================

const ProductsListView: FC<Props> = ({ products }) => {
  return (
    <div>
      {products.map((item) => (
        <ProductCard9
          id={item.id as string}
          key={item.id}
          slug={item.handle as string}
          title={item.title as string}
          price={0}
          off={0}
          rating={0}
          imgUrl={item.images ? item.images[0]?.url : "" }
        />
      ))}

      <FlexBetween flexWrap="wrap" mt={4}>
        <Span color="grey.600">Showing 1-9 of 1.3k Products</Span>
        <Pagination count={10} variant="outlined" color="primary" />
      </FlexBetween>
    </div>
  );
};

export default ProductsListView;
