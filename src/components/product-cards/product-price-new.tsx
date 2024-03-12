/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useMemo } from "react";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import { FlexBox } from "components/flex-box";
import { findPriceRange } from "utils/price";
import { useCart, useRegions } from "medusa-react";
import { Variant } from "types/global";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

// ==============================================================
type Props = { item: PricedProduct  };
// ==============================================================

const ProductPrice: FC<Props> = ({  item }) => {
  
  //  const { cart } = useCart();
  // const { regions } = useRegions();

  //   const range = useMemo(() => {
  //             if (item.variants && cart?.region) {
  //               return findPriceRange(item.variants as Variant[], cart?.region);
  //             }
  //             if (item.variants && regions) {
  //               return findPriceRange(item.variants as Variant[], regions?.at(0) as Region);
  //             }
  //             return 0;
  //           },[cart?.region, item.variants, regions])

  // return (
  //   <FlexBox alignItems="center" gap={1} mt={0.5}>
  //       <Box component="del" fontWeight={600} color="grey.600">
  //         {range}
  //       </Box>
  //   </FlexBox>
  // );

  return null;
};

export default ProductPrice;
