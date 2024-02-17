import {
  AppBar,
  Box,
  Button,
  DialogContent,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Radio,
  ToggleButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useFullScreenLoading, useSidebar } from '../../../../context/ui'

import React, { useEffect, useState } from 'react'
import ThemeSwitcherButton from '../botones/ThemeSwitcherButton'
import { CustomDialog } from '../modales/CustomDialog'

import { useAuth } from '../../../../context/auth'
import { delay, siteName, titleCase } from '../../../utils'
import { useRouter } from 'next/router'
import { Icono } from '../Icono'
import { IconoTooltip } from '../botones/IconoTooltip'
import { AlertDialog } from '../modales/AlertDialog'
import { imprimir } from '../../../utils/imprimir'
import { RoleType } from '../../../../modules/login/types/loginTypes'
import { useThemeContext } from '../../../../context/ui/ThemeContext'
import { useSession } from '../../../hooks'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import { Constantes } from '../../../../config'

export const NavbarUser = () => {
  const [modalAyuda, setModalAyuda] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const [roles, setRoles] = useState<RoleType[]>([])

  const { cerrarSesion } = useSession()

  const { usuario, setRolUsuario, rolUsuario } = useAuth()

  const { sideMenuOpen, closeSideMenu, openSideMenu } = useSidebar()

  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoading()

  const [mostrarAlertaCerrarSesion, setMostrarAlertaCerrarSesion] =
    useState(false)

  const router = useRouter()

  const { themeMode, toggleTheme } = useThemeContext()

  const cambiarRol = async (event: React.ChangeEvent<HTMLInputElement>) => {
    imprimir(`Valor al hacer el cambio: ${event.target.value}`)
    cerrarMenu()
    mostrarFullScreen(`Cambiando de rol..`)
    await delay(1000)
    await router.replace({
      pathname: '/admin/home',
    })
    await setRolUsuario({ idRol: `${event.target.value}` })
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
    await cerrarSesion()
  }

  const interpretarRoles = () => {
    imprimir(`Cambio en roles 📜`, usuario?.roles)
    if (usuario?.roles && usuario?.roles.length > 0) {
      setRoles(usuario?.roles)
    }
  }

  const abrirPerfil = async () => {
    cerrarMenu()
    await router.push('/admin/perfil')
  }

  /// Interpretando roles desde estado
  useEffect(() => {
    interpretarRoles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  const theme = useTheme()
  // const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const accionMostrarAlertaCerrarSesion = () => {
    cerrarMenu()
    setMostrarAlertaCerrarSesion(true)
  }

  return (
    <>
      <AlertDialog
        isOpen={mostrarAlertaCerrarSesion}
        titulo={'Alerta'}
        texto={`¿Está seguro de cerrar sesión?`}
      >
        <Button
          variant={'outlined'}
          onClick={() => {
            setMostrarAlertaCerrarSesion(false)
          }}
        >
          Cancelar
        </Button>
        <Button
          variant={'contained'}
          onClick={async () => {
            setMostrarAlertaCerrarSesion(false)
            await cerrarMenuSesion()
          }}
        >
          Aceptar
        </Button>
      </AlertDialog>
      <CustomDialog
        isOpen={modalAyuda}
        handleClose={cerrarModalAyuda}
        title={'Información'}
      >
        <DialogContent>
          <Typography variant={'body2'} sx={{ pt: 2, pb: 2 }}>
            Propuesta de Frontend Base Administrador creado con NextJS y
            Typescript
          </Typography>
        </DialogContent>
      </CustomDialog>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            id={'menu-sidebar'}
            size="large"
            aria-label="Menu lateral"
            name={sideMenuOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
            edge="start"
            color={'primary'}
            onClick={() => {
              if (sideMenuOpen) {
                closeSideMenu()
              } else {
                openSideMenu()
              }
            }}
            sx={{ mr: 0 }}
          >
            {sideMenuOpen ? (
              <Icono color={'primary'}>menu_open</Icono>
            ) : (
              <Icono color={'primary'}>menu</Icono>
            )}
          </IconButton>
          <Grid
            container
            alignItems={'center'}
            flexDirection={'row'}
            sx={{ flexGrow: 1 }}
          >
            <Box display={'inline-flex'}>
              <Grid
                container
                alignItems={'center'}
                flexDirection={'row'}
                justifyContent={'flex-start'}
                onClick={async () => {
                  await router.replace({
                    pathname: '/admin/home',
                  })
                }}
                sx={{ cursor: 'pointer' }}
              >
                <Image
                  src={`${Constantes.sitePath}/icono.png`}
                  alt={''}
                  width="30"
                  height="30"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
                <Box sx={{ px: 0.5 }} />
                <Typography
                  color={'text.primary'}
                  component="div"
                  sx={{ fontWeight: '600' }}
                >
                  {siteName()}
                </Typography>
              </Grid>
            </Box>
          </Grid>
          <IconoTooltip
            id={'ayudaUser'}
            name={'Ayuda'}
            titulo={'Ayuda'}
            accion={() => {
              abrirModalAyuda()
            }}
            icono={'help_outline'}
          />
          {!xs && <ThemeSwitcherButton />}
          <ToggleButton
            sx={{ px: 1.5, minWidth: 0, borderWidth: 0 }}
            size="small"
            onClick={desplegarMenu}
            color="primary"
            value={''}
            selected={!!anchorEl}
          >
            <Icono color={'primary'}>account_circle</Icono>
            {!xs && (
              <Box
                sx={{ p: 1 }}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'start'}
              >
                <Typography
                  variant={'body2'}
                  color="text.primary"
                  fontWeight={'500'}
                >
                  {`${titleCase(usuario?.persona.nombres ?? '')}`}
                </Typography>
              </Box>
            )}
          </ToggleButton>
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
            autoFocus={false}
          >
            <MenuItem onClick={abrirPerfil}>
              <Icono color={'inherit'} fontSize={'small'}>
                person
              </Icono>
              <Box width={'15px'} />
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'start'}
              >
                <Typography
                  variant={'body2'}
                  color="text.primary"
                  fontWeight={'500'}
                >
                  {titleCase(usuario?.persona?.nombres ?? '')}{' '}
                  {titleCase(
                    usuario?.persona?.primerApellido ??
                      usuario?.persona?.segundoApellido ??
                      ''
                  )}
                </Typography>
                <Typography variant={'caption'} color="text.secondary">
                  {`${rolUsuario?.nombre}`}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            {roles.length > 1 && (
              <>
                <MenuItem
                  sx={{
                    ml: 0,
                    '&.MuiButtonBase-root:hover': {
                      bgcolor: 'transparent',
                    },
                  }}
                >
                  <Icono color={'inherit'} fontSize={'small'}>
                    switch_account
                  </Icono>
                  <Box width={'15px'} />
                  <Typography variant={'body2'} fontWeight={'500'}>
                    Roles
                  </Typography>
                </MenuItem>
                <List key={`roles`} sx={{ p: 0, pl: 2 }}>
                  {roles.map((rol, indexRol) => (
                    <ListItem key={`rol-${indexRol}`}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          borderRadius: 1,
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Box width={'20px'} />
                        <FormControlLabel
                          value={rol.idRol}
                          control={
                            <Radio
                              checked={rolUsuario?.idRol == rol.idRol}
                              onChange={cambiarRol}
                              color={'success'}
                              size="small"
                              value={rol.idRol}
                              name="radio-buttons"
                            />
                          }
                          componentsProps={{ typography: { variant: 'body2' } }}
                          label={rol.nombre}
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </>
            )}
            <Divider />
            <MenuItem sx={{ px: 2.5, py: 1.5, mt: 1 }} onClick={toggleTheme}>
              {themeMode === 'light' ? (
                <Icono color={'inherit'} fontSize={'small'}>
                  dark_mode
                </Icono>
              ) : (
                <Icono color={'inherit'} fontSize={'small'}>
                  light_mode
                </Icono>
              )}

              <Box width={'15px'} />
              <Typography variant={'body2'} fontWeight={'500'}>
                {themeMode === 'light' ? `Modo oscuro` : `Modo claro`}{' '}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              sx={{ px: 2.5, py: 1.5, mt: 1 }}
              onClick={accionMostrarAlertaCerrarSesion}
            >
              <Icono color={'error'} fontSize={'small'}>
                logout
              </Icono>
              <Box width={'15px'} />
              <Typography variant={'body2'} fontWeight={'600'} color={'error'}>
                Cerrar sesión
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  )
}
