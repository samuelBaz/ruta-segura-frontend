import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F6F6F7',
    },
    primary: {
      main: '#255EA6',
    },
    secondary: {
      main: '#555F71',
    },
    error: {
      main: '#BA1B1B',
    },
  },
  typography: {
    fontFamily: ['Poppins', '-apple-system'].join(','),
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#FFF',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FBFBFB',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'dense',
        size: 'small',
      },
    },
  },
})
