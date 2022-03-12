import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#232226',
    },
    primary: {
      main: '#50D8EE',
    },
    secondary: {
      main: '#B1CBD1',
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
          backgroundColor: '#353436',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
})
