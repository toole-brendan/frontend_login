import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import VersionSelector from './components/VersionSelector';
import { fontFamilies, fontWeights } from './styles/theme-constants';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#121212',
    },
    grey: {
      800: '#2A2A2A',
      900: '#1A1A1A',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: fontFamilies.primary,
    body1: {
      fontSize: '1rem',
      fontWeight: fontWeights.regular,
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <VersionSelector />
    </ThemeProvider>
  );
}

export default App;
