import {
  AppBar,
  Box,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Radio,
  Toolbar,
  Typography,
} from '@mui/material'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import { UIContext, useFullScreenLoadingContext } from '../../context/ui'

import React, { useContext, useEffect, useState } from 'react'
import ThemeSwitcherButton from './ThemeSwitcherButton'
import { CustomDialog } from './CustomDialog'

import { useAuth } from '../../context/auth'
import { delay, imprimir, titleCase } from '../../utils'
import { RoleType } from '../../types'
import { useRouter } from 'next/router'
import { Icono } from './Icono'
import { IconoTooltip } from './IconoTooltip'

export const NavbarUser = () => {
  const [modalAyuda, setModalAyuda] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [roles, setRoles] = useState<RoleType[]>([])

  const { usuario, idRolUsuario, setRolUsuario, cerrarSesion } = useAuth()

  const { sidemenuOpen, closeSideMenu, openSideMenu } = useContext(UIContext)

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoadingContext()

  const router = useRouter()

  const cambiarRol = async (event: React.ChangeEvent<HTMLInputElement>) => {
    imprimir(`Valor al hacer el cambio: ${event.target.value}`)
    cerrarMenu()
    mostrarFullScreen(`Cambiando de rol..`)
    await delay(1500)
    await router.push({
      pathname: '/home',
    })
    setRolUsuario({ idRol: event.target.value })
    ocultarFullScreen()
  }

  const abrirModalAyuda = () => {
    setModalAyuda(true)
  }
  const cerrarModalAyuda = () => {
    setModalAyuda(false)
  }

  const desplegarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const cerrarMenu = () => {
    setAnchorEl(null)
  }

  const cerrarMenuSesion = async () => {
    cerrarMenu()
    await delay(100)
    cerrarSesion()
  }

  const interpretarRoles = () => {
    imprimir(`Cambio en roles 📜`)
    if (usuario?.roles && usuario?.roles.length > 0) {
      setRoles(usuario?.roles)
    }
  }

  const abrirPerfil = async () => {
    await router.push('/perfil')
  }

  /// Interpretando roles desde estado
  useEffect(() => {
    interpretarRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  return (
    <>
      <CustomDialog
        isOpen={modalAyuda}
        handleClose={cerrarModalAyuda}
        title={'Información'}
      >
        <Typography variant={'body2'}>
          Propuesta de Frontend Base Administrador elaborado con NextJS y
          Typescript
        </Typography>
      </CustomDialog>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ borderBottom: 'thin solid rgba(0, 0, 0, 0.05)', padding: '0' }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color={'primary'}
            onClick={() => {
              if (!sidemenuOpen) {
                openSideMenu()
              } else {
                closeSideMenu()
              }
            }}
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Typography
            color={'primary'}
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            Frontend base
          </Typography>

          <IconoTooltip
            titulo={'Ayuda'}
            accion={() => {
              abrirModalAyuda()
            }}
            icono={'help_outline'}
          />
          <ThemeSwitcherButton />
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="false"
            onClick={desplegarMenu}
            color="primary"
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={cerrarMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            autoFocus={false}
          >
            <MenuItem sx={{ p: 2 }} onClick={abrirPerfil}>
              <Icono>person</Icono>
              <Box width={'20px'} />
              <Typography variant={'body2'}>
                {`${titleCase(usuario?.persona.nombres ?? '')}`}
              </Typography>
            </MenuItem>
            <MenuItem
              sx={{
                p: 2,
                ml: 0,
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }}
            >
              <Icono>switch_account</Icono>
              <Box width={'20px'} />
              <Typography variant={'body2'}>Roles </Typography>
            </MenuItem>
            <List key={`roles`} sx={{ p: 0 }}>
              {roles.map((rol, indexRol) => (
                <ListItem key={`rol-${indexRol}`}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      borderRadius: 1,
                      alignItems: 'center',
                    }}
                  >
                    <Box width={'20px'} />
                    <FormControlLabel
                      value={rol.idRol}
                      control={
                        <Radio
                          checked={idRolUsuario === rol.idRol}
                          onChange={cambiarRol}
                          color={'success'}
                          size="small"
                          value={rol.idRol}
                          name="radio-buttons"
                          inputProps={{ 'aria-label': 'A' }}
                        />
                      }
                      componentsProps={{ typography: { variant: 'body2' } }}
                      label={rol.nombre}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
            <MenuItem sx={{ p: 2 }} onClick={cerrarMenu}>
              <Icono>vpn_key</Icono>
              <Box width={'20px'} />
              <Typography variant={'body2'}>Cambiar contraseña</Typography>
            </MenuItem>
            <MenuItem sx={{ p: 2 }} onClick={cerrarMenuSesion}>
              <Icono>logout</Icono>
              <Box width={'20px'} />
              <Typography variant={'body2'}>Cerrar sesión</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
}
