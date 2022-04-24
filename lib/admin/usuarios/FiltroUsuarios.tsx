import { FiltroUsuariosType, RolType } from '../../../types'
import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card, Grid } from '@mui/material'
import {
  FormInputDropdownMultiple,
  FormInputText,
} from '../../../components/ui/form'

interface filtroUsuariosType {
  filtroUsuariosValor: string
  cambioFiltroUsuariosValor: (nuevoFiltro: string) => void
  rolesDisponibles: RolType[]
  filtroRolesValor: string
  cambioFiltroRolesValor: (nuevoFiltroRoles: string) => void
}

/// Componente espesífico para filtros de usuarios
export const FiltroUsuarios: FC<filtroUsuariosType> = ({
  filtroUsuariosValor,
  cambioFiltroUsuariosValor,
  rolesDisponibles,
  filtroRolesValor,
  cambioFiltroRolesValor,
}) => {
  const { handleSubmit, control, watch } = useForm<FiltroUsuariosType>({
    defaultValues: {
      filtro: filtroUsuariosValor,
      roles: filtroRolesValor ? filtroRolesValor.split(',') : [],
    },
  })

  const filtroUsuarioWatch: string = watch('filtro')
  const filtroRolesWatch: string[] = watch('roles')

  const limpiarFiltroUsuario = ({ filtro }: FiltroUsuariosType) => {
    cambioFiltroUsuariosValor('')
  }

  useEffect(() => {
    const timeOutId = setTimeout(
      () => cambioFiltroUsuariosValor(filtroUsuarioWatch),
      1000
    )
    return () => clearTimeout(timeOutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroUsuarioWatch])

  useEffect(() => {
    const timeOutId = setTimeout(
      () => cambioFiltroRolesValor(filtroRolesWatch.join(',')),
      1000
    )
    return () => clearTimeout(timeOutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtroRolesWatch])

  return (
    <Grid
      container
      direction="row"
      spacing={{ xs: 1, md: 3 }}
      columns={{ xs: 1, sm: 4, md: 8, xl: 12 }}
    >
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ borderRadius: 2, p: 2 }}>
          <FormInputText
            control={control}
            id={'filtro'}
            key={`filtro`}
            name="filtro"
            label="Usuario"
            onClear={handleSubmit(limpiarFiltroUsuario)}
          />
        </Card>
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <Card sx={{ borderRadius: 2, p: 2 }}>
          <FormInputDropdownMultiple
            control={control}
            id={'roles'}
            name="roles"
            label="Roles"
            options={rolesDisponibles.map((rol) => ({
              key: rol.id,
              value: rol.id,
              label: rol.nombre,
            }))}
          />
        </Card>
      </Grid>
    </Grid>
  )
}
