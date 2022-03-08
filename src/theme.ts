import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
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

export default theme
