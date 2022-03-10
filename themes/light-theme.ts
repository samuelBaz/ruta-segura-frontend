import { createTheme } from '@mui/material'
import { grey, red } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFF',
    },
    primary: {
      main: '#9C4052',
    },
    secondary: {
      main: '#76565A',
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
          backgroundColor: '#F7F7F8',
        },
      },
    },
  },
})
