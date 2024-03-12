"use client";

import { FC } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Carousel } from "components/carousel";
import { SectionCreator } from "components/section-header";
import { ProductCard2 } from "components/product-cards/product-card-2";
// CUSTOM ICON COMPONENT
import Light from "icons/Light";
// COMMON STYLES
import { ARROW_BUTTON_STYLE } from "./style";
// CUSTOM DATA MODEL
import Product from "models/Product.model";

// =================================================
type Props = { flashDeals: Product[] };
// =================================================

const Section2: FC<Props> = ({ flashDeals }) => {
  const responsive = [
    { breakpoint: 950, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ];

  return (
    <SectionCreator icon={<Light color="primary" />} title="Flash Deals">
      <Carousel
        slidesToShow={4}
        responsive={responsive}
        arrowStyles={ARROW_BUTTON_STYLE}
      >
        {flashDeals.map((item) => (
          <ProductCard2
            key={item.id}
            slug={item.slug}
            title={item.title}
            price={item.price}
            off={item.discount}
            rating={item.rating}
            imgUrl={item.thumbnail}
          />
        ))}
      </Carousel>
    </SectionCreator>
  );
};

export default Section2;
