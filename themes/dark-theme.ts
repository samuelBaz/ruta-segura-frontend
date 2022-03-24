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
          backgroundColor: '#21201F',
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
          backgroundColor: '#21201F',
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
      },
    },
  },
})
