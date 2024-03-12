import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCategoriesPageView from "pages-sections/product-details/categories/product-list";
import medusaClient from "utils/medusaClient";
// PAGE VIEW COMPONENT

export const metadata: Metadata = {
  title: "Product Categories | Bazaar Commerce React Template",
  description: "Product Categories Page",
  openGraph: {
    title: "Product Categories | Bazaar Commerce React Template",
    description: "Product Categories Page",
  },
};

export default async function ProductCategories({ params }) {
  try {
    "use server";
    const product = await medusaClient.productCategories.list({
    handle: String(params.slug)
  }).then((res)=>  medusaClient.products.list({ category_id: [res.product_categories[0].id] }));
  
  const products = product.products;

    return (
        
      <ProductCategoriesPageView
        product={products}
        handle={params.slug}
      />
    );
  } catch (error) {
    notFound();
  }
}
