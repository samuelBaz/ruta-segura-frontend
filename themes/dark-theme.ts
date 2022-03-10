import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#232226',
    },
    primary: {
      main: '#FFB2BF',
    },
    secondary: {
      main: '#E5BDC1',
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
  },
})
