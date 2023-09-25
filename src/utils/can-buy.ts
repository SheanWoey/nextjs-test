import { ProductVariant } from '@medusajs/medusa';

export const canBuy = (variant: Omit<ProductVariant, 'beforeInsert'>) =>
  variant.inventory_quantity > 0 || variant.allow_backorder === true;
