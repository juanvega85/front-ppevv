import { createTheme } from '@ppe/ui';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E0EE11',
      light: '#dbdaf5',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Montserrat, sans-serif',
    },
    h1: {
      fontSize: 22,
      fontWeight: 400,
    },
    h2: {
      fontSize: 20,
      fontWeight: 400,
    },
  },
});

export default theme;
