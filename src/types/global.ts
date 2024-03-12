import { ProductCategory, ProductVariant } from "@medusajs/medusa";

export type ProductCategoryWithChildren = Omit<
  ProductCategory,
  "category_children"
> & {
  category_children: ProductCategory[];
  category_parent?: ProductCategory;
};

export type Variant = Omit<ProductVariant, 'beforeInsert'>;
