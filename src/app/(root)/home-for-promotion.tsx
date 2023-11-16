import { m } from 'framer-motion';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { textGradient, bgGradient } from 'src/theme/css';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeForPromotion() {
  const theme = useTheme();

  const upMd = useResponsive('up', 'md');

  const renderDescription = (
    <Box sx={{ textAlign: { xs: 'center', md: 'unset' }, mt: { xs: 10, md: 15 } }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h4">
          Free All Shipping for celebrating our new platform, using the code below to enjoy the
          benefit
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: 5,
            ...textGradient(
              `300deg, ${
                theme.palette.mode === 'light'
                  ? theme.palette.primary.darker
                  : theme.palette.primary.lighter
              } 0%, ${theme.palette.background.default} 100%`
            ),
          }}
        >
          FREESHIPPING
        </Typography>
      </m.div>
    </Box>
  );

  const renderImg = (
    <Box
      component={m.img}
      src="/assets/images/home/free_shipping.png"
      variants={varFade().in}
      sx={{
        height: 1,
        width: 0.5,
        objectFit: 'contain',
        position: 'absolute',
      }}
    />
  );

  return (
    <Box
      sx={{
        minHeight: 560,
        overflow: 'hidden',
        position: 'relative',
        ...bgGradient({
          startColor: `${theme.palette.grey[900]} 25%`,
          endColor: alpha(theme.palette.grey[900], 0),
          imgUrl: '/assets/images/home/for_designer.webp',
        }),
        ...(upMd && {
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.8),
            imgUrl: '/assets/background/overlay_4.jpg',
          }),
        }),
      }}
    >
      <Container component={MotionViewport}>
        <Grid container>
          <Grid xs={12} md={6}>
            {renderDescription}
          </Grid>

          {upMd && <Grid md={6}>{renderImg}</Grid>}
        </Grid>
      </Container>
    </Box>
  );
}
