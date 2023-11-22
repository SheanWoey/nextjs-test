'use client';

import { Cart, Region } from '@medusajs/medusa';
import {
  useCart,
  useCreateLineItem,
  useDeleteLineItem,
  useMeCustomer,
  useMedusa,
  useUpdateLineItem,
} from 'medusa-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { medusaClient } from 'src/utils/medusaClient';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

interface VariantInfoProps {
  variantId: string;
  quantity: number;
}

interface LineInfoProps {
  lineId: string;
  quantity: number;
}

interface IStoreContext {
  customerCart: Omit<Cart, 'refundable_amount' | 'refunded_total'> | undefined;
  countryCode: string | undefined;
  setRegion: (regionId: string, countryCode: string) => void;
  addItem: (item: VariantInfoProps) => void;
  updateItem: (item: LineInfoProps) => void;
  deleteItem: (lineId: string) => void;
  resetCart: () => void;
}

const StoreContext = React.createContext<IStoreContext | null>(null);

const useStore = () => {
  const context = React.useContext(StoreContext);
  if (context === null) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export default useStore;

interface StoreProps {
  children: React.ReactNode;
}

const IS_SERVER = typeof window === 'undefined';
const REGION_KEY = 'medusa_region';

export const StoreProvider = ({ children }: StoreProps) => {
  const { cart, setCart, createCart, updateCart } = useCart();
  const [countryCode, setCountryCode] = useState<string | undefined>(undefined);
  const addLineItem = useCreateLineItem(cart?.id!);
  const removeLineItem = useDeleteLineItem(cart?.id!);
  const adjustLineItem = useUpdateLineItem(cart?.id!);
  const { enqueueSnackbar } = useSnackbar();

  const session = useMeCustomer();
  const authenticated = session?.customer && !session?.failureReason;

  const router = useRouter();
  const medusa = useMedusa();

  useEffect(() => {
    if (!IS_SERVER) {
      const storedRegion = localStorage.getItem(REGION_KEY);
      if (storedRegion) {
        const { inputCountryCode } = JSON.parse(storedRegion);
        setCountryCode(inputCountryCode);
      }
    }
  }, []);

  const getRegion = () => {
    if (!IS_SERVER) {
      const region = localStorage.getItem(REGION_KEY);
      if (region) {
        return JSON.parse(region) as { regionId: string; countryCode: string };
      }
    }
    return null;
  };

  const updateCartCustomer = useCallback(
    async (id: string) => {
      if (!IS_SERVER) {
        await medusa.client.customers
          .update({
            metadata: { cart_id: id },
          })
          .then(() => {
            enqueueSnackbar('data updated', { variant: 'success' });
          })
          .catch((error) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [medusa.client.customers]
  );

  const getCart = () => {
    if (!IS_SERVER && session?.customer) {
      return session?.customer?.metadata.cart_id;
    }
    return null;
  };

  // const deleteCart = () => {
  //   if (!IS_SERVER) {
  //     localStorage.removeItem(CART_KEY);
  //   }
  // };

  const deleteRegion = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(REGION_KEY);
    }
  };

  const storeRegion = useCallback(
    (regionId: string, inputCountryCode: string) => {
      if (!IS_SERVER) {
        localStorage.setItem(REGION_KEY, JSON.stringify({ regionId, countryCode }));

        setCountryCode(inputCountryCode);
      }
    },
    [countryCode]
  );

  const setRegion = useCallback(
    async (regionId: string, inputCountryCode: string) => {
      await updateCart.mutateAsync(
        {
          region_id: regionId,
        },
        {
          onSuccess: ({ cart: cartPtr }) => {
            setCart(cartPtr);

            storeRegion(regionId, inputCountryCode);
          },
          onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
              console.error(error);
            }
          },
        }
      );
    },
    [setCart, storeRegion, updateCart]
  );

  const ensureRegion = useCallback(
    (region: Region, inputCountryCode?: string | null) => {
      if (!IS_SERVER) {
        const { regionId, countryCode: defaultCountryCode } = getRegion() || {
          regionId: region.id,
          countryCode: region.countries[0].iso_2,
        };

        const finalCountryCode = inputCountryCode || defaultCountryCode;

        if (regionId !== region.id) {
          setRegion(region.id, finalCountryCode);
        }

        storeRegion(region.id, finalCountryCode);
        setCountryCode(finalCountryCode);
      }
    },
    [setRegion, storeRegion]
  );

  const createNewCart = async (regionId?: string) => {
    if (authenticated) {
      await createCart.mutate(
        { region_id: regionId },
        {
          onSuccess: ({ cart: cartPtr }) => {
            setCart(cartPtr);

            updateCartCustomer(cartPtr.id);
            ensureRegion(cartPtr.region, cartPtr.shipping_address?.country_code);
          },
          onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
              console.error(error);
            }
          },
        }
      );
    }
  };

  useEffect(() => {
    if (authenticated) {
      const ensureCart = async () => {
        const cartId = getCart();
        const region = getRegion();

        if (cartId && typeof cartId === 'string') {
          const cartRes = await medusaClient.carts
            .retrieve(cartId)
            .then(({ cart: cartPtr }) => cartPtr)
            .catch(async (_) => null);

          if (!cartRes || cartRes.completed_at) {
            // deleteCart();
            deleteRegion();
            await createNewCart();
            return;
          }

          setCart(cartRes);
          ensureRegion(cartRes.region);
        } else {
          await createNewCart(region?.regionId);
        }
      };

      if (!IS_SERVER && !cart?.id && authenticated) {
        ensureCart();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const providerValue = useMemo(() => {
    const resetCart = () => {
      const savedRegion = getRegion();
      createCart.mutate(
        {
          region_id: savedRegion?.regionId,
        },
        {
          onSuccess: ({ cart: cartPtr }) => {
            setCart(cartPtr);
            updateCartCustomer(cartPtr.id);

            ensureRegion(cartPtr.region, cartPtr.shipping_address?.country_code);
          },
          onError: (error) => {
            if (process.env.NODE_ENV === 'development') {
              console.error(error);
            }
          },
        }
      );
    };
    const addItem = ({ variantId, quantity }: { variantId: string; quantity: number }) => {
      if (!authenticated) {
        const searchParams = new URLSearchParams({
          returnTo: window.location.pathname,
        }).toString();

        const loginPath = paths.auth.jwt.login;

        const href = `${loginPath}?${searchParams}`;

        router.push(href);
      }

      addLineItem.mutate(
        {
          variant_id: variantId,
          quantity,
        },
        {
          onSuccess: ({ cart: cartPtr }) => {
            setCart(cartPtr);
          },
          onError: (error) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          },
        }
      );
    };

    const deleteItem = (lineId: string) => {
      removeLineItem.mutate(
        {
          lineId,
        },
        {
          onSuccess: ({ cart: cartPtr }) => {
            setCart(cartPtr);
          },
          onError: (error) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          },
        }
      );
    };

    const updateItem = ({ lineId, quantity }: { lineId: string; quantity: number }) => {
      adjustLineItem.mutate(
        {
          lineId,
          quantity,
        },
        {
          onSuccess: ({ cart: cartPtr }) => {
            setCart(cartPtr);
            enqueueSnackbar('Product quantity updated', { variant: 'success' });
          },
          onError: (error) => {
            enqueueSnackbar(error.message, { variant: 'error' });
          },
        }
      );
    };

    return {
      customerCart: cart,
      countryCode,
      setRegion,
      addItem,
      deleteItem,
      updateItem,
      resetCart,
    };
  }, [
    addLineItem,
    adjustLineItem,
    authenticated,
    cart,
    countryCode,
    createCart,
    enqueueSnackbar,
    ensureRegion,
    removeLineItem,
    router,
    setCart,
    setRegion,
    updateCartCustomer,
  ]);

  return <StoreContext.Provider value={providerValue}>{children}</StoreContext.Provider>;
};
