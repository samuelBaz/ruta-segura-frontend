import { Meta, StoryFn } from '@storybook/react'

import {
  CustomDrawer,
  SidebarModuloType,
} from '../../../../common/components/ui/sidebar/CustomDrawer'
import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'

interface SidebarProps {
  variant: 'small' | 'collapsed' | 'withBadge'
  variantBadge:
    | 'PorDefecto'
    | 'Secondary'
    | 'Opacity'
    | 'Outline'
    | 'Gradient'
    | 'Error'
    | 'Success'
    | 'Alert'
}

interface MensajeType {
  id: string
  valor: string
}
const badgeVariantMap: { [key in SidebarProps['variantBadge']]: string } = {
  PorDefecto: 'primary',
  Secondary: 'secondary',
  Opacity: 'opacity',
  Outline: 'outline',
  Gradient: 'gradient',
  Error: 'error',
  Success: 'success',
  Alert: 'alert',
}

export default {
  title: 'Organismos/Navegación/Sidebar',
  component: CustomDrawer,
  parameters: {
    docs: {
      description: {
        component:
          'El componente `Sidebar` utiliza componentes de MUI, junto con componentes personalizados como `CustomDrawer`y `CustomBadge`. El componente Sidebar nos facilita la visualización y navegación entre módulos y submódulos dentro del sistema.',
      },
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['small', 'collapsed', 'withBadge'],
      },
    },
  },
  variantBadge: {
    control: {
      type: 'select',
      options: [
        'PorDefecto',
        'Secondary',
        'Opacity',
        'Outline',
        'Gradient',
        'Error',
        'Success',
        'Alert',
      ],
    },
  },
} as Meta<typeof CustomDrawer>

// replica del componente
const Template: StoryFn<SidebarProps> = (args: SidebarProps) => {
  const mensajes: MensajeType = { id: '/admin/usuarios', valor: '44' }

  const [openSidebar, setOpenSidebar] = useState<boolean>(true)
  const [modulos, setModulos] = useState<SidebarModuloType[]>([
    {
      estado: 'ACTIVO',
      id: '1',
      label: 'Principal',
      nombre: 'Principal',
      open: true,
      propiedades: { orden: 1, descripcion: 'Sección principal' },
      showed: false,
      subModulo: [
        {
          estado: 'ACTIVO',
          id: '2',
          label: 'Inicio',
          nombre: 'inicio',
          propiedades: {
            icono: 'home',
            orden: 1,
            descripcion: 'Vista de bienvenida con características del sistema',
          },
          url: '/admin/home',
        },
        {
          estado: 'ACTIVO',
          id: '3',
          label: 'Perfil',
          nombre: 'perfil',
          propiedades: {
            icono: 'person',
            orden: 2,
            descripcion: 'Información del perfil de usuario que inicio sesión',
          },
          url: '/admin/perfil',
        },
      ],
      url: '/principal',
    },
    {
      estado: 'ACTIVO',
      id: '4',
      label: 'Configuración',
      nombre: 'configuraciones',
      open: args.variant !== 'collapsed',
      propiedades: { orden: 2, descripcion: 'Sección de configuraciones' },
      showed: false,
      subModulo: [
        {
          estado: 'ACTIVO',
          id: '5',
          label: 'Usuarios',
          nombre: 'usuarios',
          propiedades: {
            icono: 'manage_accounts',
            orden: 1,
            descripcion: 'Control de usuarios del sistema',
          },
          url: args.variant === 'withBadge' ? '/admin/usuarios' : 'admin/123',
        },
        {
          estado: 'ACTIVO',
          id: '6',
          label: 'Parámetros',
          nombre: 'parametros',
          propiedades: {
            icono: 'tune',
            orden: 2,
            descripcion: 'Parámetros generales del sistema',
          },
          url: '/admin/parametros',
        },
      ],
      url: '/configuraciones',
    },
  ])

  const mostrarMensaje = (id: string): string => {
    return id === mensajes.id ? mensajes.valor : ''
  }

  useEffect(() => {
    setOpenSidebar(true)
    setModulos((prevModulos) =>
      args.variant === 'collapsed'
        ? prevModulos.map((modulo) => ({ ...modulo, open: false }))
        : prevModulos
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.variant])

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '60vh',
      }}
    >
      <CustomDrawer
        open={openSidebar}
        variant={'persistent'}
        onClose={() => {}}
        sx={{
          width: 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 220,
            boxSizing: 'border-box',
          },
          transition: 'all 0.2s ease-out',
        }}
        rutaActual={'/admin/usuarios'}
        modulos={modulos}
        setModulos={setModulos}
        navigateTo={() => {}}
        badgeVariant={
          args.variant === 'withBadge'
            ? badgeVariantMap[args.variantBadge ?? 'PorDefecto']
            : ''
        }
        mostrarMensaje={mostrarMensaje}
      />
      <Button onClick={() => setOpenSidebar(!openSidebar)} variant="contained">
        Small
      </Button>
    </Box>
  )
}

export const SidebarSmall = Template.bind({})
SidebarSmall.args = {
  variant: 'small',
}

export const SidebarCollapsed = Template.bind({})
SidebarCollapsed.args = {
  variant: 'collapsed',
}

export const SidebarWithBadge = Template.bind({})
SidebarWithBadge.args = {
  variant: 'withBadge',
  variantBadge: 'PorDefecto',
}
