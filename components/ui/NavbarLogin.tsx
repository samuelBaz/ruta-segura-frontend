import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import Box from '@mui/material/Box'
import { CustomDialog } from './CustomDialog'
import { useState } from 'react'
import ThemeSwitcherButton from './ThemeSwitcherButton'

export const NavbarLogin = () => {
  const [modalAyuda, setModalAyuda] = useState(false)
  const abrirModalAyuda = () => {
    setModalAyuda(true)
  }
  const cerrarModalAyuda = () => {
    setModalAyuda(false)
  }

  return (
    <>
      <CustomDialog
        isOpen={modalAyuda}
        handleClose={cerrarModalAyuda}
        title={'Información'}
      >
        <Typography variant={'body2'}>
          Esta es el login de una propuesta de Frontend Base elaborado con
          NextJS y Typescript
        </Typography>
      </CustomDialog>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ borderBottom: 'thin solid rgba(0, 0, 0, 0.12)', padding: '0' }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            onClick={() => {
              abrirModalAyuda()
            }}
            color="primary"
          >
            <HelpOutlineOutlinedIcon />
          </IconButton>
          <ThemeSwitcherButton />
        </Toolbar>
      </AppBar>
    </>
  )
}
