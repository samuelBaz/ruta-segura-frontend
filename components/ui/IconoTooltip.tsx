import React, { FC, ReactNode } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import { Icono } from './Icono'

interface Props {
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
  accion: () => void
  desactivado?: boolean
}

export const IconoTooltip: FC<Props> = ({
  color = 'primary',
  icono,
  titulo,
  accion,
  desactivado = false,
}) => {
  return (
    <Tooltip title={titulo}>
      <span>
        <IconButton
          disabled={desactivado}
          classes={{
            root: 'icon-button-root',
            disabled: 'icon-button-disabled',
          }}
          aria-label={titulo}
          onClick={accion}
        >
          <Icono color={desactivado ? 'disabled' : color}> {icono}</Icono>
        </IconButton>
      </span>
    </Tooltip>
  )
}
