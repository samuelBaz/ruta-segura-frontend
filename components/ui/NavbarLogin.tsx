import { AppBar, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { CustomDialog } from './CustomDialog'
import React, { useState } from 'react'
import ThemeSwitcherButton from './ThemeSwitcherButton'
import { IconoTooltip } from './IconoTooltip'

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
          Propuesta de Frontend Base Login elaborado con NextJS y Typescript
        </Typography>
      </CustomDialog>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconoTooltip
            titulo={'Ayuda'}
            accion={() => {
              abrirModalAyuda()
            }}
            icono={'help_outline'}
            name={'Ayuda'}
          />
          <ThemeSwitcherButton />
        </Toolbar>
      </AppBar>
    </>
  )
}
