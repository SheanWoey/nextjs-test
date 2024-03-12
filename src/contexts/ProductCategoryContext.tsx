import { createContext } from "react";
import { ProductCategoryWithChildren } from "types/global";

export const ProductCategoryContext = createContext<
  ProductCategoryWithChildren[]
>([]);

export const ProductCategoryProvider = ({ children, productCategories }) => {
  return (
    <ProductCategoryContext.Provider value={productCategories}>
      {children}
    </ProductCategoryContext.Provider>
  );
};

export default ProductCategoryProvider;
