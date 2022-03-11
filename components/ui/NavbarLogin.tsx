import { AppBar, IconButton, Toolbar } from '@mui/material'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import { imprimir } from '../../utils'
import Box from '@mui/material/Box'

export const NavbarLogin = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      style={{ borderBottom: 'thin solid rgba(0, 0, 0, 0.12)', padding: '0' }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          onClick={function () {
            imprimir('Abrir modal con ayuda')
          }}
          color="primary"
        >
          <HelpOutlineOutlinedIcon />
        </IconButton>
        <IconButton
          size="large"
          onClick={function () {
            imprimir('Cambiar a modo claro oscuro o de sistema')
          }}
          color="primary"
        >
          <LightModeOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
