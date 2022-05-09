/// Vista modal de filtro de usuarios
import React from 'react'
import { useForm } from 'react-hook-form'
import { RolType } from '../../../common/types'
import { Box, Button, DialogActions, Grid } from '@mui/material'
import { FormInputDropdownMultiple } from '../../../common/components/ui/form'

export interface FiltroType {
  roles: string[]
}

export interface FiltroModalUsuarioType {
  rolesDisponibles: RolType[]
  filtroRoles: string[]
  accionCorrecta: (filtros: FiltroType) => void
  accionCerrar: () => void
}

export const FiltroModalUsuarios = ({
  rolesDisponibles,
  filtroRoles,
  accionCorrecta,
}: FiltroModalUsuarioType) => {
  const { handleSubmit, control } = useForm<FiltroType>({
    defaultValues: {
      roles: filtroRoles,
    },
  })

  return (
    <Grid container direction={'column'} justifyContent="space-evenly">
      <Box height={'10px'} />
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={12}>
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
            rules={{ required: 'Este campo es requerido' }}
          />
        </Grid>
      </Grid>
      <Box height={'30px'} />
      <DialogActions
        sx={{
          justifyContent: {
            xs: 'center',
          },
        }}
      >
        <Button variant={'contained'} onClick={handleSubmit(accionCorrecta)}>
          Aplicar
        </Button>
      </DialogActions>
    </Grid>
  )
}
