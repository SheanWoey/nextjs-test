import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useProducts } from 'medusa-react';
import { Link } from '@mui/material';
import { MotionViewport, varFade } from 'src/components/animate';
import { LoadingScreen } from 'src/components/loading-screen';
import { RouterLink } from 'src/routes/components';

import { bgGradient } from 'src/theme/css';
import { useResponsive } from 'src/hooks/use-responsive';

export default function HomeProducts() {
  const { isLoading, products: productsFilter } = useProducts({
    limit: 3,
  });
  const theme = useTheme();
  const upMd = useResponsive('up', 'md');

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box
      sx={{
        minHeight: 560,
        overflow: 'hidden',
        position: 'relative',
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.8),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
      }}
    >
      <Container
        component={MotionViewport}
        sx={{
          py: { xs: 10, md: 15 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">
              Top Sales <br /> Sales products of the month
            </Typography>
          </m.div>
        </Stack>

        <Box
          gap={{ xs: 3, lg: 10 }}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {productsFilter &&
            productsFilter.map((product) => (
              <m.div variants={varFade().inUp} key={product.title} style={{ height: '100%' }}>
                <Card
                  component={m.div}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={{
                    hover: {
                      scale: 1.2,
                      translateY: 0,
                      transition: { duration: 0.2 },
                    },
                    rest: {
                      translateY: [-10, 0, -10],
                      transition: { duration: 4, repeat: Infinity },
                    },
                  }}
                  sx={{
                    height: '100%',
                    // maxHeight: '550px',
                    textAlign: 'center',
                    border: '1px solid white',
                    bgcolor: 'background.default',
                    p: (theme2) => theme2.spacing(10, 5),
                    boxShadow: (theme2) => ({
                      md: `-40px 40px 80px ${
                        theme2.palette.mode === 'light'
                          ? alpha(theme2.palette.grey[500], 0.16)
                          : alpha(theme2.palette.common.black, 0.4)
                      }`,
                    }),
                    ...(upMd && {
                      ...{
                        maxWidth: '100%',
                        minWidth: '100%',
                      },
                    }),
                    maxWidth: '400px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <Box
                    component="img"
                    src={product.thumbnail || '/assets/images/home/rocket.webp'}
                    alt={product.title}
                    height={100}
                    sx={{ mx: 'auto' }}
                  />

                  <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                    <Link
                      component={RouterLink}
                      href={`/products/${product.handle}`}
                      color="inherit"
                      variant="subtitle2"
                    >
                      {product.title}
                    </Link>
                  </Typography>

                  <Typography sx={{ color: 'text.secondary' }}>{product.description}</Typography>
                </Card>
              </m.div>
            ))}
        </Box>
      </Container>
    </Box>
  );
}
