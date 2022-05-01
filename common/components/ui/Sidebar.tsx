import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useRouter } from 'next/router'
import { UIContext, useFullScreenLoadingContext } from '../../../context/ui'
import Toolbar from '@mui/material/Toolbar'
import { useAuth } from '../../../context/auth'
import { imprimir } from '../../utils'
import { ModuloType, RoleType } from '../../types'
import { Icono } from './Icono'

const drawerWidth = 240

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu, openSideMenu } = useContext(UIContext)

  const { usuario, idRolUsuario, estaAutenticado, progresoLogin } = useAuth()

  const [modulos, setModulos] = useState<ModuloType[]>([])

  const theme = useTheme()
  const router = useRouter()

  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const md = useMediaQuery(theme.breakpoints.only('md'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const { estadoFullScreen } = useFullScreenLoadingContext()

  const interpretarModulos = () => {
    imprimir(`Cambio en modulos: ${JSON.stringify(usuario)}`)
    let roles: RoleType[]
    let rolSeleccionado: RoleType | undefined
    roles = usuario?.roles ?? []
    if (roles && roles.length > 0) {
      rolSeleccionado = roles.find((itemRol) => itemRol.idRol == idRolUsuario)
      if (rolSeleccionado) {
        setModulos(rolSeleccionado.modulos)
        imprimir(`cantidad: ${rolSeleccionado.modulos.length} modulos`)
      }
    }
  }

  const rutaActiva = (routeName: string, currentRoute: string) => {
    return routeName === currentRoute
  }

  const navigateTo = async (url: string) => {
    if (sm || xs || md) {
      closeSideMenu()
    }
    await router.push(url)
  }

  useEffect(() => {
    if (sm || xs || md) {
      closeSideMenu()
    } else {
      openSideMenu()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm, xs, md])

  useEffect(() => {
    interpretarModulos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRolUsuario])

  return (
    <Drawer
      variant={sm || xs || md ? 'temporary' : 'persistent'}
      open={
        sidemenuOpen &&
        estaAutenticado &&
        modulos.length > 0 &&
        !progresoLogin &&
        !estadoFullScreen &&
        !modulos.find((modulo) => rutaActiva(modulo.url, router.pathname))
      }
      onClose={closeSideMenu}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: sidemenuOpen ? drawerWidth : `0`,
        border: 'none',
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          borderWidth: 0.0,
          boxSizing: 'border-box',
        },
        transition: 'all 0.1s ease-out',
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List key={`lista`}>
          {modulos.map((modulo, index) => (
            <div key={`div-${index}`}>
              <ListItem key={`modulo-${index}`}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    m: 0,
                    borderRadius: 1,
                    alignItems: 'center',
                  }}
                >
                  <Box width={'10px'} />
                  <Typography
                    variant={'body2'}
                    color={'text.secondary'}
                  >{`${modulo.label}`}</Typography>
                </Box>
              </ListItem>
              <List key={`submodulos-${index}`}>
                {modulo.subModulo.map((subModuloItem, indexSubModulo) => (
                  <ListItem
                    button
                    key={`submodulo-${indexSubModulo}`}
                    selected={rutaActiva(subModuloItem.url, router.pathname)}
                    onClick={() => navigateTo(subModuloItem.url)}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        p: '1 2 3 4',
                        m: 0,
                        borderRadius: 1,
                        alignItems: 'center',
                      }}
                    >
                      <Box width={'20px'} />
                      <Icono>{subModuloItem.propiedades.icono}</Icono>

                      <Box width={'20px'} />
                      <Typography
                        variant={'body2'}
                      >{`${subModuloItem.label}`}</Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
