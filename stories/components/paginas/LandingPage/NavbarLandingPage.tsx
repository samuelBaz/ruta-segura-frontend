import { AppBar, Toolbar, useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import ThemeSwitcherButton from '../../../../common/components/ui/botones/ThemeSwitcherButton'
import { IconoTooltip } from '../../../../common/components/ui/botones/IconoTooltip'
import { alpha } from '@mui/material/styles'

export const NavbarLandingPage = () => {
  const theme = useTheme()

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(12px)',
          boxShadow: 0,
          borderBottom: 1,
          borderColor: 'ActiveCaption',
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeSwitcherButton />
          <IconoTooltip
            id={'login'}
            name={'login'}
            titulo={'login'}
            accion={() => {}}
            color={`action`}
            icono={'account_circle'}
          />
        </Toolbar>
      </AppBar>
    </>
  )
}
