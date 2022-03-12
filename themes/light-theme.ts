import { createTheme } from '@mui/material'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFF',
    },
    primary: {
      main: '#006876',
    },
    secondary: {
      main: '#4B6267',
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
    MuiTable: {
      defaultProps: {},
    },
  },
})
