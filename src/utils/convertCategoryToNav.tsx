import { ProductCategory } from '@medusajs/medusa';
import Iconify from 'src/components/iconify';
import { NavItemProps } from 'src/layouts/main/nav/types';

export default function convertCategoryToNav(categories: ProductCategory[]): NavItemProps {
  return {
    title: 'Shop',
    path: '/shop',
    icon: <Iconify icon="mdi:shopping-cart-outline" />,
    children: categories.map((category) => ({
      subheader: category.name,
      items: category.category_children.map((subcategory) => ({
        title: subcategory.name,
        path: `/categories/${subcategory.handle}`,
      })),
    })),
  };
}
