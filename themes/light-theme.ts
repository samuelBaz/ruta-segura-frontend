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
      default: '#FAFAFA',
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
        variant: 'outlined',
      },
      styleOverrides: {
        colorPrimary: {
          borderTop: 0,
          borderLeft: 0,
          borderRight: 0,
          backgroundColor: alpha('#FFF', 0.4),
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: '600',
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
          backgroundColor: '#FFF',
          // borderWidth: 0.0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: '#454F5B',
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
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: alpha('#FFF', 0.9),
          backdropFilter: 'blur(12px)',
        },
      },
      defaultProps: {
        elevation: 3,
      },
    },
    MuiIcon: {
      styleOverrides: {
        colorAction: {
          color: '#454F5B',
        },
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
