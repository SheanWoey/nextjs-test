'use client';

import { useState, memo, useCallback } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
// hooks
import { useProducts } from 'medusa-react';
import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useRouter } from 'src/routes/hooks';
import SearchNotFound from 'src/components/search-not-found';
//
import { NavListProps } from 'src/components/nav-section';
import ResultItem from './result-item';
import { applyFilter, groupedData, getAllItems } from './utils';

// ----------------------------------------------------------------------

function Searchbar() {
  const theme = useTheme();

  const router = useRouter();

  const search = useBoolean();

  const [searchQuery, setSearchQuery] = useState('');

  const {
    products: productsFilter,
    isSuccess,
    refetch,
  } = useProducts({
    q: searchQuery,
    limit: 10,
    fields: 'handle,title,id',
  });

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (path: string) => {
      if (path.includes('http')) {
        window.open(path);
      } else {
        router.push(path);
      }
      handleClose();
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(event.target.value);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dataFiltered = isSuccess
    ? applyFilter({
        inputData: getAllItems(productsFilter) as NavListProps[],
        query: searchQuery,
      })
    : [];

  const notFound = searchQuery && !dataFiltered?.length;

  const renderItems = () => {
    const data = groupedData(dataFiltered);

    return Object.keys(data || [])
      .sort((a, b) => -b.localeCompare(a))
      .map((group, index) => (
        <List key={group || index} disablePadding>
          {data &&
            data[group].map((item: any) => {
              const { title, path } = item;

              const partsTitle = parse(title, match(title, searchQuery));

              const partsPath = parse(path, match(path, searchQuery));

              return (
                <ResultItem
                  path={partsPath}
                  title={partsTitle}
                  key={`${title}${path}`}
                  onClickItem={() => handleClick(path)}
                />
              );
            })}
        </List>
      ));
  };

  const renderButton = (
    <Stack direction="row" alignItems="center">
      <IconButton onClick={search.onTrue}>
        <Iconify icon="eva:search-fill" />
      </IconButton>
    </Stack>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: 0,
        }}
        PaperProps={{
          sx: {
            mt: 15,
            overflow: 'unset',
          },
        }}
        sx={{
          [`& .${dialogClasses.container}`]: {
            alignItems: 'flex-start',
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </Box>

        <Scrollbar sx={{ p: 3, pt: 2, height: 400 }}>
          {notFound ? <SearchNotFound query={searchQuery} sx={{ py: 10 }} /> : renderItems()}
        </Scrollbar>
      </Dialog>
    </>
  );
}

export default memo(Searchbar);
