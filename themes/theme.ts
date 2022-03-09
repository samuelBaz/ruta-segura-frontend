import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: grey[100],
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
})

const darkTheme = createTheme({
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
})

const themes = { darkTheme, lightTheme }

export default themes
