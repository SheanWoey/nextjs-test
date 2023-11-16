import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { MotionViewport, varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  const settings = useSettingsContext();

  const renderDescription = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
          Easy switch between styles.
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography variant="h2">Dark mode</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography>A dark theme that feels easier on the eyes.</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Switch
          checked={settings.themeMode === 'dark'}
          onClick={() =>
            settings.onUpdate('themeMode', settings.themeMode === 'light' ? 'dark' : 'light')
          }
        />
      </m.div>
    </Stack>
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        pt: { xs: 10, md: 15 },
        pb: { xs: 10, md: 20 },
        bgcolor: 'background.default',
      }}
    >
      <Container component={MotionViewport}>{renderDescription}</Container>
    </Box>
  );
}
