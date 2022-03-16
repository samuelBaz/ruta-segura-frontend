import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useRouter } from 'next/router'
import { UIContext } from '../../context/ui'
import Toolbar from '@mui/material/Toolbar'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { useAuth } from '../../context/auth'
import { imprimir } from '../../utils'

const drawerWidth = 240

export interface Propiedades {
  icono: string
  color_dark: string
  color_light: string
}

export interface SubModulo {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: Propiedades
  estado: string
}

export interface Modulo {
  id: string
  label: string
  url: string
  nombre: string
  propiedades: Propiedades
  estado: string
  subModulo: SubModulo[]
}

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu, openSideMenu } = useContext(UIContext)

  const { user } = useAuth()

  const [modulos, setModulos] = useState<Modulo[]>([])

  const theme = useTheme()
  const router = useRouter()
  let usm = useMediaQuery(theme.breakpoints.up('sm'))

  const interpretarRoles = () => {
    imprimir(`Cambio en usuario: ${JSON.stringify(user)}`)
    let roles = []
    let rolSeleccionado: any = ''
    roles = user?.roles
    if (roles && roles.length > 0) {
      rolSeleccionado = roles[0]
      setModulos(rolSeleccionado.modulos)
      imprimir(`cantidad: ${JSON.stringify(modulos)}`)
    }
  }

  const rutaActiva = (routeName: string, currentRoute: string) => {
    return routeName === currentRoute
  }

  const navigateTo = async (url: string) => {
    await router.push(url)
  }

  useEffect(() => {
    if (!usm) {
      closeSideMenu()
    } else {
      openSideMenu()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usm])

  useEffect(() => {
    interpretarRoles()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Drawer
      variant={usm ? 'persistent' : 'temporary'}
      open={sidemenuOpen}
      onClose={closeSideMenu}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: sidemenuOpen ? drawerWidth : `0`,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List key={`lista`}>
          {modulos.map((modulo, index) => (
            <div key={`div-${index}`}>
              <ListItem key={`modulo-${index}`}>
                <ListItemText>
                  <Typography variant={'body2'}>{`${modulo.label}`}</Typography>
                </ListItemText>
              </ListItem>
              <List key={`submodulos-${index}`}>
                {modulo.subModulo.map((subModuloItem, indexSubModulo) => (
                  <ListItem
                    button
                    key={`submodulo-${indexSubModulo}`}
                    selected={rutaActiva(subModuloItem.url, router.pathname)}
                    onClick={() => navigateTo(subModuloItem.url)}
                  >
                    <ListItemIcon>
                      {indexSubModulo % 2 === 0 ? (
                        <InboxIcon color={'primary'} />
                      ) : (
                        <MailIcon color={'primary'} />
                      )}
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant={'body2'}
                      >{`${subModuloItem.label}`}</Typography>
                    </ListItemText>
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
