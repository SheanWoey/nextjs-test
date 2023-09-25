'use client';

import isEqual from 'lodash/isEqual';
import { formatVariantPrice, useCart } from 'medusa-react';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { canBuy } from 'src/utils/can-buy';
import { findCheapestPrice } from 'src/utils/price';
import { Variant } from 'src/types/medusa';
import useStore from './useStore';

interface ProductContext {
  formattedPrice: string;
  quantity: number;
  disabled: boolean;
  inStock: boolean;
  variant?: Variant;
  maxQuantityMet: boolean;
  options: Record<string, string>;
  updateOptions: (options: Record<string, string>) => void;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  addToCart: () => void;
}

const ProductActionContext = createContext<ProductContext | null>(null);

interface ProductProviderProps {
  children?: React.ReactNode;
  product: PricedProduct;
}

export const ProductProvider = ({ product, children }: ProductProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [maxQuantityMet, setMaxQuantityMet] = useState<boolean>(false);
  const [inStock, setInStock] = useState<boolean>(true);

  const { addItem } = useStore();
  const { cart } = useCart();
  const variants = product.variants as unknown as Variant[];

  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {};

    product.options?.map((option) => Object.assign(optionObj, { [option.id]: undefined }));

    setOptions(optionObj);
  }, [product]);

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    variants.map((variant) => {
      const tmp: Record<string, string> = {};

      variant.options.map((option) => {
        tmp[option.option_id] = option.value;
        return tmp;
      });

      map[variant.id] = tmp;

      return tmp;
    }, []);

    return map;
  }, [variants]);

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined;

    Object.keys(variantRecord).map((key) => {
      console.log(variantRecord, options);

      if (isEqual(variantRecord[key], options)) {
        variantId = key;
      }
      return variantId;
    });

    return variants.find((v) => v.id === variantId);
  }, [options, variantRecord, variants]);

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id]);
    }
  }, [variants, variantRecord]);

  const disabled = useMemo(() => !variant, [variant]);

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (variant && cart?.region) {
      return formatVariantPrice({ variant, region: cart.region });
    }
    if (cart?.region) {
      return findCheapestPrice(variants, cart.region);
    }
    // if no variant is selected, or we couldn't find a price for the region/currency
    return 'N/A';
  }, [variant, variants, cart]);

  useEffect(() => {
    if (variant) {
      setInStock(canBuy(variant));
    }
  }, [variant]);

  const updateOptions = useCallback(
    (update: Record<string, string>) => {
      setOptions({ ...options, ...update });
    },
    [options]
  );

  const addToCart = useCallback(() => {
    if (variant) {
      addItem({
        variantId: variant.id,
        quantity,
      });
    }
  }, [addItem, quantity, variant]);

  const increaseQuantity = useCallback(() => {
    const maxQuantity = variant?.inventory_quantity || 0;

    if (maxQuantity > quantity + 1) {
      setQuantity(quantity + 1);
    } else {
      setMaxQuantityMet(true);
    }
  }, [quantity, variant?.inventory_quantity]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(quantity - 1);

      if (maxQuantityMet) {
        setMaxQuantityMet(false);
      }
    }
  }, [maxQuantityMet, quantity]);

  const providerValue = useMemo(
    () => ({
      quantity,
      maxQuantityMet,
      disabled,
      inStock,
      options,
      variant,
      addToCart,
      updateOptions,
      decreaseQuantity,
      increaseQuantity,
      formattedPrice,
    }),
    [
      addToCart,
      decreaseQuantity,
      disabled,
      formattedPrice,
      inStock,
      increaseQuantity,
      maxQuantityMet,
      options,
      quantity,
      updateOptions,
      variant,
    ]
  );

  return (
    <ProductActionContext.Provider value={providerValue}>{children}</ProductActionContext.Provider>
  );
};

export const useProductActions = () => {
  const context = useContext(ProductActionContext);
  if (context === null) {
    throw new Error('useProductActionContext must be used within a ProductActionProvider');
  }
  return context;
};
