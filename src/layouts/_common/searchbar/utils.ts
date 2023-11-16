// utils
import { flattenArray } from 'src/utils/flatten-array';
// components
import { NavListProps, NavSectionProps } from 'src/components/nav-section';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

// ----------------------------------------------------------------------

export function getAllItems(data: PricedProduct[] | undefined) {
  const items = flattenArray(data || []).map((option) => {
    return {
      title: option.title,
      path: `/products/${option.handle}`,
    };
  });

  return items;
}

// ----------------------------------------------------------------------

type FilterProps = {
  inputData: NavListProps[];
  query: string;
};

export function applyFilter({ inputData, query }: FilterProps) {
  if (query) {
    inputData = inputData?.filter(
      (item) =>
        item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.path.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return inputData;
}

// ----------------------------------------------------------------------

export function splitPath(array: NavListProps[], key: string) {
  let stack = array.map((item) => ({
    path: [item.title],
    currItem: item,
  }));

  while (stack.length) {
    const { path, currItem } = stack.pop() as {
      path: string[];
      currItem: NavListProps;
    };

    if (currItem.path === key) {
      return path;
    }

    if (currItem.children?.length) {
      stack = stack.concat(
        currItem.children.map((item: NavListProps) => ({
          path: path.concat(item.title),
          currItem: item,
        }))
      );
    }
  }
  return null;
}

// ----------------------------------------------------------------------

export function handleLoop(array: any, subheader?: string) {
  return array?.map((list: any) => ({
    subheader,
    ...list,
    ...(list.children && {
      children: handleLoop(list.children, subheader),
    }),
  }));
}

// ----------------------------------------------------------------------

type GroupsProps = {
  [key: string]: NavListProps[];
};

export function groupedData(array?: NavListProps[]) {
  const group = array?.reduce((groups: GroupsProps, item) => {
    groups[item.title] = groups[item.title] || [];

    groups[item.title].push(item);

    return groups;
  }, {});
  return group;
}
