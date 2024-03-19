import { createTheme } from '@mui/material';
import '@fontsource/poppins';

const theme = createTheme({
  palette: {
    primary: {
      main: '#61677A',
      light: '#EEEEEE', 
    },
  },
  typography: {
    h3: {
      fontWeight: 600, 
      fontSize: 32,
      letterSpacing: 0.25,
      fontFamily: 'Poppins, sans-serif',
    },
    h4: {
      fontWeight: 600, 
      fontSize: 30,
      letterSpacing: 0.25, 
      fontFamily: 'Poppins, sans-serif',
    },
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.25,
      fontFamily: 'Poppins, sans-serif',
    },
    h6: {
      fontWeight: 500,
      fontSize: 24,
      letterSpacing: 0.25,
      fontFamily: 'Poppins, sans-serif',
    },
    body1: {
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: 0.25,
      fontFamily: 'Poppins, sans-serif',
    },
    body2: {
      fontWeight: 400,
      fontSize: 14,
      letterSpacing: 0.25,
      fontFamily: 'Poppins, sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export { theme };