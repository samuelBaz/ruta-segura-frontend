import { createTheme } from '@mui/material'
import { Open_Sans } from 'next/font/google'
import { alpha } from '@mui/material/styles'

const OpenSansFont = Open_Sans({
  subsets: ['latin'],
  style: ['normal'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#F5F5F5',
      paper: '#Fff',
    },
    primary: {
      main: '#255EA6',
    },
    secondary: {
      main: '#555F71',
    },
    error: {
      main: '#BA1B1B',
    },
    action: {
      active: '#757575',
    },
    text: {
      primary: '#1A1A1A',
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
          backgroundColor: alpha('#FFF', 0.6),
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
          backgroundColor: '#FBFBFB',
          borderWidth: 0.0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '10px',
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
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
          backgroundColor: '#FFFFFF',
          borderRadius: 3,
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
            backgroundColor: '#FFFFFF',
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
