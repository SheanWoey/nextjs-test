"use client";

import { FC, Fragment, useCallback, useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import { Sticky } from "components/sticky";
import { Topbar } from "components/topbar";
import { Navbar } from "components/navbar";
import { Footer1 } from "components/footer";
import Header from "components/header/header";
import { SearchInputWithCategory } from "components/search-box";
import { MobileNavigationBar } from "components/mobile-navigation";
import ProductCategoryProvider from "contexts/ProductCategoryContext";
import { ProductCategoryWithChildren } from "types/global";

/**
 *  USED IN:
 *  1. market-1, market-2, gadget-shop, fashion-shop, fashion-2, fashion-3, furniture-shop, grocery-3, gift-shop
 *  2. product details page
 *  3. order-confirmation page
 *  4. product-search page
 *  5. shops and shops-details page
 */

type Props = {
  children: React.ReactNode;
  productCategories: ProductCategoryWithChildren[];
};

const ShopLayout1: FC<Props> = ({ children, productCategories }) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed: boolean) => setIsFixed(fixed), []);

  return (
    <ProductCategoryProvider productCategories={productCategories}>
      <Fragment>
        {/* TOP BAR SECTION */}
        <Topbar />

        {/* HEADER */}
        <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
          <Header isFixed={isFixed} searchInput={<SearchInputWithCategory />} />
        </Sticky>

        {/* NAVIGATION BAR */}
        <Navbar elevation={0} border={1} />

        {/* BODY CONTENT */}
        {children}

        {/* SMALL DEVICE BOTTOM NAVIGATION */}
        <MobileNavigationBar />

        {/* FOOTER */}
        <Footer1 />
      </Fragment>
    </ProductCategoryProvider>
  );
};

export default ShopLayout1;
