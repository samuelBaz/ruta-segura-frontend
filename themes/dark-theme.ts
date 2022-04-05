import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#21201F',
    },
    primary: {
      main: '#8FF1FF',
    },
    secondary: {
      main: '#CDE7EC',
    },
    error: {
      main: '#FFB4A9',
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
          backgroundColor: '#373635',
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
          backgroundColor: '#373635',
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#373635',
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
