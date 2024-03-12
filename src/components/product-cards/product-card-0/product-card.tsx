/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import { Span } from "components/Typography";
import ProductViewDialog from "components/products-view2/product-view-dialog";
// LOCAL CUSTOM HOOK
import useProduct from "../use-product";
// LOCAL CUSTOM COMPONENTS
import HoverActions from "./hover-actions";
import ProductTitle from "../product-title";
import QuantityButtons from "./quantity-buttons";
// STYLED COMPONENTS
import { ImageWrapper, ContentWrapper, StyledBazaarCard } from "./styles";
import ProductPrice from "../product-price-new";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";

// ========================================================
type Props = {
  item: PricedProduct,
  hideRating?: boolean;
  hoverEffect?: boolean;
  showProductSize?: boolean;
};
// ========================================================

const ProductCard0: FC<Props> = ({
  item,
  // rating = 5,
  // hideRating,
  hoverEffect,
  // discount = false,
  showProductSize,
}) => {
  const {
    isFavorite,
    openModal,
    cartItem,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange,
  } = useProduct(item?.handle as string);

  const handleIncrementQuantity = () => {
    const product = {
      id: item.id,
      slug: item.handle,
      imgUrl : "/assets/images/brands/tesla.png",
      name: item.title ?? "",
      qty: (cartItem?.qty || 0) + 1,
    };
    // handleCartAmountChange(product);
  };

  const handleDecrementQuantity = () => {
    const product = {
      id: item.id,
      slug: item.handle,
      imgUrl :  "/assets/images/brands/tesla.png",
      name: item.title ?? "",
      qty: (cartItem?.qty || 0) + 1,
    };
    // handleCartAmountChange(product, "remove");
  };

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        {/* <DiscountChip discount={discount} /> */}

        {/* HOVER ACTION ICONS */}
        <HoverActions
          isFavorite={isFavorite}
          toggleView={toggleDialog}
          toggleFavorite={toggleFavorite}
        />

        {/* PRODUCT IMAGE / THUMBNAIL */}
        <Link href={`/products/${item.handle}`}>
          <LazyImage
            priority
            src={ "/assets/images/brands/tesla.png"}
            width={500}
            height={500}
            alt={item.title ?? ""}
          />
        </Link>
      </ImageWrapper>

      {/* PRODUCT VIEW DIALOG BOX */}
      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={item}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          {/* PRODUCT NAME / TITLE */}
          <ProductTitle title={item.title ?? ""} slug={item.handle as string} />

          {/* PRODUCT RATINGS IF AVAILABLE */}
          {/* {!hideRating ? (
            <Rating size="small" value={rating} color="warn" readOnly />
          ) : null} */}

          {/* PRODUCT SIZE IF AVAILABLE */}
          {showProductSize ? (
            <Span color="grey.600" mb={1} display="block">
              Liter
            </Span>
          ) : null}

          {/* PRODUCT PRICE WITH DISCOUNT */}
          <ProductPrice item={item} />
        </Box>

        {/* PRODUCT QUANTITY HANDLER BUTTONS */}
        <QuantityButtons
          quantity={cartItem?.qty || 0}
          handleIncrement={handleIncrementQuantity}
          handleDecrement={handleDecrementQuantity}
        />
      </ContentWrapper>
    </StyledBazaarCard>
  );
};

export default ProductCard0;
