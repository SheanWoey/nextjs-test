import { MoneyAmount } from '@medusajs/medusa';
import { formatAmount } from 'medusa-react';
import { Region, Variant } from 'src/types/medusa';

export const findCheapestRegionPrice = (variants: Variant[], regionId: string) => {
  const regionPrices = variants.reduce((acc, v) => {
    const price = v.prices.find((p) => p.region_id === regionId);
    if (price) {
      acc.push(price);
    }

    return acc;
  }, [] as MoneyAmount[]);

  if (!regionPrices.length) {
    return undefined;
  }

  // find the price with the lowest amount in regionPrices
  const cheapestPrice = regionPrices.reduce((acc, p) => {
    if (acc.amount > p.amount) {
      return p;
    }

    return acc;
  });

  return cheapestPrice;
};

export const findCheapestCurrencyPrice = (variants: Variant[], currencyCode: string) => {
  const currencyPrices = variants.reduce((acc, v) => {
    const price = v.prices.find((p) => p.currency_code === currencyCode);
    if (price) {
      acc.push(price);
    }

    return acc;
  }, [] as MoneyAmount[]);

  if (!currencyPrices.length) {
    return undefined;
  }

  // find the price with the lowest amount in currencyPrices
  const cheapestPrice = currencyPrices.reduce((acc, p) => {
    if (acc.amount > p.amount) {
      return p;
    }

    return acc;
  });

  return cheapestPrice;
};

export const findExpensiveRegionPrice = (variants: Variant[], regionId: string) => {
  const regionPrices = variants.reduce((acc, v) => {
    const price = v.prices.find((p) => p.region_id === regionId);
    if (price) {
      acc.push(price);
    }

    return acc;
  }, [] as MoneyAmount[]);

  if (!regionPrices.length) {
    return undefined;
  }

  // find the price with the lowest amount in regionPrices
  const expemsivePrice = regionPrices.reduce((acc, p) => {
    if (acc.amount < p.amount) {
      return p;
    }

    return acc;
  });

  return expemsivePrice;
};

export const findExpensiveCurrencyPrice = (variants: Variant[], currencyCode: string) => {
  const currencyPrices = variants.reduce((acc, v) => {
    const price = v.prices.find((p) => p.currency_code === currencyCode);
    if (price) {
      acc.push(price);
    }

    return acc;
  }, [] as MoneyAmount[]);

  if (!currencyPrices.length) {
    return undefined;
  }

  // find the price with the lowest amount in currencyPrices
  const expemsivePrice = currencyPrices.reduce((acc, p) => {
    if (acc.amount < p.amount) {
      return p;
    }

    return acc;
  });

  return expemsivePrice;
};

export const findCheapestPrice = (variants: Variant[], region: Region) => {
  const { id, currency_code } = region;

  let cheapestPrice = findCheapestRegionPrice(variants, id);

  if (!cheapestPrice) {
    cheapestPrice = findCheapestCurrencyPrice(variants, currency_code);
  }

  if (cheapestPrice) {
    return formatAmount({
      amount: cheapestPrice.amount,
      region,
    });
  }

  // if we can't find any price that matches the current region,
  // either by id or currency, then the product is not available in
  // the current region
  return 'Not available in your region';
};

export const findPriceRange = (variants: Variant[], region: Region) => {
  const { id, currency_code } = region;

  let cheapestPrice = findCheapestRegionPrice(variants, id);

  if (!cheapestPrice) {
    cheapestPrice = findCheapestCurrencyPrice(variants, currency_code);
  }

  let expensivePrice = findExpensiveRegionPrice(variants, id);

  if (!expensivePrice) {
    expensivePrice = findExpensiveCurrencyPrice(variants, currency_code);
  }

  if (cheapestPrice && expensivePrice) {
    if (cheapestPrice === expensivePrice) {
      return formatAmount({
        amount: cheapestPrice.amount,
        region,
      });
    }
    return `${formatAmount({
      amount: cheapestPrice.amount,
      region,
    })} - ${formatAmount({
      amount: expensivePrice.amount,
      region,
    })}`;
  }

  // if we can't find any price that matches the current region,
  // either by id or currency, then the product is not available in
  // the current region
  return 'Not available in your region';
};
