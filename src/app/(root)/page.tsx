'use client';

import { useScroll } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// components
import React from 'react';
import ScrollProgress from 'src/components/scroll-progress';
import HomeHero from './homeHero';
import HomeDarkMode from './home-dark-mode';
import HomeForPromotion from './home-for-promotion';
import HomeProducts from './home-products';

// ----------------------------------------------------------------------

// type StyledPolygonProps = {
//   anchor?: 'top' | 'bottom';
// };

// const StyledPolygon = styled('div')<StyledPolygonProps>(({ anchor = 'top', theme }) => ({
//   left: 0,
//   zIndex: 9,
//   height: 80,
//   width: '100%',
//   position: 'absolute',
//   clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
//   backgroundColor: theme.palette.background.default,
//   display: 'block',
//   lineHeight: 0,
//   ...(anchor === 'top' && {
//     top: -1,
//     transform: 'scale(-1, -1)',
//   }),
//   ...(anchor === 'bottom' && {
//     bottom: -1,
//     backgroundColor: theme.palette.grey[900],
//   }),
// }));

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  type StyledPolygonProps = {
    anchor?: 'top' | 'bottom';
  };

  const StyledPolygon = styled('div')<StyledPolygonProps>(({ anchor = 'top', theme }) => ({
    left: 0,
    zIndex: 9,
    height: 80,
    width: '100%',
    position: 'absolute',
    clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
    backgroundColor: theme.palette.background.default,
    display: 'block',
    lineHeight: 0,
    ...(anchor === 'top' && {
      top: -1,
      transform: 'scale(-1, -1)',
    }),
    ...(anchor === 'bottom' && {
      bottom: -1,
      transform: 'scale(1, 1)',
    }),
  }));

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          display: 'block',
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <StyledPolygon />
          <Box
            sx={{
              overflow: 'hidden',
              position: 'relative',
              display: 'block',
              bgcolor: 'background.default',
            }}
          >
            <HomeForPromotion />
          </Box>
          <StyledPolygon anchor="bottom" />
        </Box>
        <Box sx={{ position: 'relative' }}>
          <StyledPolygon />
          <HomeProducts />
          <StyledPolygon />
        </Box>
        <HomeDarkMode />
      </Box>
    </>
  );
}
