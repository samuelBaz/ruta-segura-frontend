import { Meta, StoryFn } from '@storybook/react'
import {
  CustomDrawer,
  SidebarModuloType,
} from '../../../../common/components/ui/sidebar/CustomDrawer'
import { useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import { MensajeType } from '../../../../context/ui'

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
  const mensajes: MensajeType = { id: '/admin/pedidos', valor: '44' }

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
      label: 'Opciones',
      nombre: 'opciones',
      open: args.variant !== 'collapsed',
      propiedades: { orden: 2, descripcion: 'Sección de opciones' },
      showed: false,
      subModulo: [
        {
          estado: 'ACTIVO',
          id: '5',
          label: 'Productos',
          nombre: 'productos',
          propiedades: {
            icono: 'storefront',
            orden: 1,
            descripcion: 'Control de productos del sistema',
          },
          url: args.variant === 'withBadge' ? '/admin/productos' : 'admin/123',
        },
        {
          estado: 'ACTIVO',
          id: '6',
          label: 'Pedidos',
          nombre: 'pedidos',
          propiedades: {
            icono: 'local_grocery_store',
            orden: 2,
            descripcion: 'Pedidos',
          },
          url: '/admin/pedidos',
        },
        {
          estado: 'ACTIVO',
          id: '6',
          label: 'Ventas',
          nombre: 'ventas',
          propiedades: {
            icono: 'receipt',
            orden: 2,
            descripcion: 'Ventas realizadas',
          },
          url: '/admin/ventas',
        },
      ],
      url: '/configuraciones',
    },
  ])

  const mostrarMensaje = (id: string) => {
    return id === mensajes.id ? mensajes.valor : undefined
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
    <Grid
      container
      style={{
        display: 'flex',
        justifyContent: 'center',
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
        {openSidebar ? 'Cerrar' : 'Abrir'}
      </Button>
    </Grid>
  )
}

export const BarraLateralDesplegable = Template.bind({})
BarraLateralDesplegable.storyName = 'Barra lateral desplegable'
BarraLateralDesplegable.args = {
  variant: 'small',
}

export const BarraLateralColapsada = Template.bind({})
BarraLateralColapsada.storyName = 'Barra lateral colapsada'
BarraLateralColapsada.args = {
  variant: 'collapsed',
}

export const BarrateralConItemBadge = Template.bind({})
BarrateralConItemBadge.storyName = 'Barra lateral con badge'
BarrateralConItemBadge.args = {
  variant: 'withBadge',
  variantBadge: 'PorDefecto',
}

export const BarrateralConItemBadgeOtroColor = Template.bind({})
BarrateralConItemBadgeOtroColor.storyName =
  'Barra lateral con badge de otro color'
BarrateralConItemBadgeOtroColor.args = {
  variant: 'withBadge',
  variantBadge: 'Error',
}
