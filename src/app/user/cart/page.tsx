'use client';

// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { Card, CardMedia, CardContent, Grid, Button, IconButton, TextField } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import useStore from 'src/hooks/useStore';
import { fCurrency } from 'src/utils/format-number';
import EmptyContent from 'src/components/empty-content/empty-content';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Cart',
};

export default function CartView() {
  const settings = useSettingsContext();
  const { customerCart, updateItem } = useStore();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> My Cart </Typography>

      <Box
        sx={{
          my: 5,
          borderRadius: 2,
          bgcolor: (theme: any) => alpha(theme.palette.grey[500], 0.04),
          border: (theme: any) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {customerCart && customerCart.items.length > 0 ? (
          customerCart.items.map((item) => (
            <Card sx={{ display: 'flex', margin: 2 }}>
              <CardMedia
                sx={{ width: 151 }}
                image={item.thumbnail as 'string | undefined'}
                title="Live from space album cover"
              />
              <CardContent sx={{ flex: '1 0 auto', width: '100%' }}>
                <CardMedia
                  sx={{ width: 151 }}
                  image={item.thumbnail as 'string | undefined'}
                  title="Live from space album cover"
                />
                <Typography variant="body1" component="h2" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="subtitle2">{item.description}</Typography>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs sx={{ mt: { xs: 2, md: 1 } }}>
                        <Typography variant="body1" component="div">
                          Quantity
                        </Typography>
                      </Grid>
                      <Grid item sx={{ mt: { xs: 2, md: 1 } }}>
                        <Grid container spacing={1} direction="row">
                          <Grid item>
                            <IconButton
                              sx={{ fontSize: 'x-large' }}
                              onClick={() =>
                                updateItem({ lineId: item.id, quantity: item.quantity - 1 })
                              }
                            >
                              -
                            </IconButton>
                          </Grid>
                          <Grid item xs>
                            <TextField
                              sx={{ textAlign: 'center', width: '72px' }}
                              id="outlined-number"
                              type="number"
                              value={item.quantity}
                              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                          </Grid>
                          <Grid item>
                            <IconButton
                              sx={{ fontSize: 'x-large' }}
                              onClick={() =>
                                updateItem({ lineId: item.id, quantity: item.quantity + 1 })
                              }
                            >
                              +
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container sx={{ mt: { xs: 2, md: 1 } }}>
                      <Grid item xs>
                        <Typography variant="body1" component="div" style={{ fontWeight: 'bold' }}>
                          Price
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="h6" component="div" color="secondary">
                          {fCurrency(item.total as number)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              borderRadius: 2,
            }}
          >
            <EmptyContent
              title="Cart is Empty!"
              description="Look like you have no items in your shopping cart."
              imgUrl="/assets/icons/empty/ic_cart.svg"
              sx={{ pt: 5, pb: 10 }}
            />
          </Box>
        )}
      </Box>
      {customerCart && customerCart.items.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'end',
            mt: 3,
          }}
        >
          <Button variant="contained" size="large">
            Go to Payment
          </Button>
        </Box>
      )}
    </Container>
  );
}
