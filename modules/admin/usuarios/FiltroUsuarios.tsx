import { IconoTooltip } from '../../../common/components/ui'
import { Box, DialogContent, Menu, Toolbar, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import {
  FormInputDropdownMultiple,
  FormInputText,
} from '../../../common/components/ui/form'
import { RolType } from '../../../common/types'
import { useForm } from 'react-hook-form'
import { imprimir } from '../../../common/utils'

export interface FiltroUsuariosType {
  rolesDisponibles: RolType[]
  cambioFiltroRoles: (idRoles: string[]) => void
}

export const FiltroUsuarios = ({
  rolesDisponibles,
  cambioFiltroRoles,
}: FiltroUsuariosType) => {
  /// Indicador para mostrar el filtro de usuarios
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  imprimir(`dibujando filtro otra vez 🥲`)

  // Formulario

  const { control, reset, watch } = useForm<{
    filtro: string | undefined
    roles: Array<string>
  }>({
    defaultValues: {
      filtro: '',
      roles: [],
    },
  })

  const filtroRolesWatch: string[] = watch('roles')

  useEffect(() => {
    imprimir(`filtroRolesWatch 😬: ${filtroRolesWatch}`)
    const timeOutId = setTimeout(
      () => cambioFiltroRoles(filtroRolesWatch),
      1000
    )
    return () => clearTimeout(timeOutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroRolesWatch])

  return (
    <div>
      <IconoTooltip
        id="boton-filtro-usuarios-id"
        titulo={'Filtrar'}
        accion={handleClick}
        icono={'filter_list'}
        name={'Filtrar lista de usuarios'}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="boton-filtro-usuarios-id"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ width: '100%', minWidth: 300, maxWidth: 300 }}>
          <Toolbar>
            <Typography
              color={'text.primary'}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Filtro
            </Typography>
            <IconoTooltip
              titulo={'Limpiar'}
              accion={() => {
                reset({ filtro: '', roles: [] })
              }}
              icono={'delete_outline'}
              name={'Limpiar filtros'}
            />
            <IconoTooltip
              titulo={'Cerrar'}
              accion={handleClose}
              icono={'close'}
              name={'Cerrar'}
            />
          </Toolbar>
          <DialogContent>
            <FormInputText
              id={'filtro'}
              control={control}
              name="filtro"
              label="Usuario"
              onClear={() => {
                reset({ filtro: '' })
              }}
            />
            <Box height={'10px'} />
            <FormInputDropdownMultiple
              id={'roles'}
              name="roles"
              control={control}
              label="Roles"
              options={rolesDisponibles.map((rol) => ({
                key: rol.id,
                value: rol.id,
                label: rol.nombre,
              }))}
            />
          </DialogContent>
        </Box>
      </Menu>
    </div>
  )
}
