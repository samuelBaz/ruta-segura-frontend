import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const lightTheme = createTheme({
  palette: {
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
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
})

const themes = { darkTheme, lightTheme }

export default themes
