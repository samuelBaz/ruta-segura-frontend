import { createTheme } from '@mui/material'
import { Open_Sans } from 'next/font/google'
import { alpha } from '@mui/material/styles'

const OpenSansFont = Open_Sans({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#21201F',
      paper: '#373635',
    },
    primary: {
      main: '#A7C8FF',
    },
    secondary: {
      main: '#BDC7DC',
    },
    error: {
      main: '#FFB4A9',
    },
    action: {
      active: '#9FA6AD',
    },
    text: {
      primary: '#FAFAFA',
    },
  },
  typography: {
    fontFamily: OpenSansFont.style.fontFamily,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        variant: 'elevation',
      },
      styleOverrides: {
        colorPrimary: {
          borderTop: 0,
          backgroundColor: alpha('#302F2E', 0.6),
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: '600',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#302F2E',
          borderWidth: 0.0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '10px',
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.24),
          },
        }),
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined',
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
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          sx: {
            backgroundColor: '#131313',
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        fontSizeInherit: () => ({
          fontSize: 'inherit !important',
        }),
        fontSizeSmall: ({ theme }) => ({
          fontSize: `${theme.typography.pxToRem(20)} !important`,
        }),
        fontSizeLarge: ({ theme }) => ({
          fontSize: `${theme.typography.pxToRem(36)} !important`,
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})
