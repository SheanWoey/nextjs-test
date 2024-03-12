"use server";
import { PropsWithChildren } from "react";
import { ShopLayout1 } from "components/layouts/shop-layout-1";
import medusaClient from "utils/medusaClient";

export default async function Layout1({ children }: PropsWithChildren) {
  const productCategoriesRes = await medusaClient.productCategories.list({
    expand: "category_children",
  });

  const productCategories = productCategoriesRes.product_categories.filter(
    (category) => category.parent_category_id === null
  );

  return (
    <ShopLayout1 productCategories={productCategories}>{children}</ShopLayout1>
  );
}
