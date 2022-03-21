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
}

export const IconoTooltip: FC<Props> = ({
  color = 'primary',
  icono,
  titulo,
  accion,
}) => {
  return (
    <Tooltip title={titulo}>
      <IconButton aria-label={titulo} onClick={accion}>
        <Icono color={color}> {icono}</Icono>
      </IconButton>
    </Tooltip>
  )
}
