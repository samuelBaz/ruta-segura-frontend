import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Icono } from './Icono'
import React, { MouseEventHandler, ReactNode, useState } from 'react'
import { IconoTooltip } from './IconoTooltip'

interface TipoAccion {
  color?:
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  titulo: string
  icono: ReactNode
  accion: MouseEventHandler<any> | undefined
  desactivado?: boolean

  mostrar?: boolean
  name: string
  id?: string | undefined
}

interface BotonAccionesParams {
  desactivado?: false
  color?:
    | 'inherit'
    | 'action'
    | 'disabled'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
  acciones: Array<TipoAccion>
}

export const BotonAcciones = ({
  desactivado = false,
  color = 'primary',
  acciones = [],
}: BotonAccionesParams) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const desplegarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const cerrarMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {acciones.length >= 3 ? (
        <>
          <IconButton
            size="small"
            aria-label="acciones"
            aria-controls="menu-acciones"
            aria-haspopup="false"
            onClick={desplegarMenu}
            color="primary"
            style={{ textTransform: 'none' }}
          >
            <Icono color={desactivado ? 'disabled' : color}>more_horiz</Icono>
          </IconButton>
          <Menu
            id="menu-acciones"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorEl)}
            onClose={cerrarMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            autoFocus={false}
          >
            {acciones
              .filter((value) => value.mostrar)
              .map((accion, index) => (
                <MenuItem
                  id={accion.id}
                  key={`${index}-accion`}
                  onClick={(event) => {
                    cerrarMenu()
                    if (accion.accion) return accion.accion(event)
                  }}
                  disabled={accion.desactivado}
                >
                  <Icono color={accion.color}>{accion.icono}</Icono>
                  <Box width={'20px'} />
                  <Typography variant={'body2'}>{accion.titulo}</Typography>
                </MenuItem>
              ))}
          </Menu>
        </>
      ) : (
        <>
          {acciones
            .filter((value) => value.mostrar)
            .map((accion, index) => (
              <IconoTooltip
                id={accion.id}
                titulo={accion.titulo}
                color={accion.color}
                key={`${index}-accion`}
                desactivado={accion.desactivado}
                icono={accion.icono}
                accion={accion.accion}
                name={accion.name}
              />
            ))}
        </>
      )}
    </>
  )
}
