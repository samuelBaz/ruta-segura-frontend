import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { Icono } from './Icono'
import React, { ReactNode, useState } from 'react'
import { CriterioOrdenType, OrdenEnum } from '../../types/ordenTypes'

interface BotonOrdenarParams {
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
  cambioCriterios: (nuevosCriterios: Array<CriterioOrdenType>) => void
  criterios: Array<CriterioOrdenType>
  icono?: ReactNode
  label: string
  id: string
}

export const ordenFiltrado = (ordenCriterios: Array<CriterioOrdenType>) =>
  ordenCriterios
    .filter((value) => value.orden)
    .map((value) => (value.orden == 'asc' ? value.campo : `-${value.campo}`))

export const ToggleOrden = (
  ordenAnterior: OrdenEnum | undefined
): OrdenEnum | undefined => {
  switch (ordenAnterior) {
    case OrdenEnum.DESC:
      return OrdenEnum.ASC
    case OrdenEnum.ASC:
      return undefined
    default:
      return OrdenEnum.DESC
  }
}

export const BotonOrdenar = ({
  desactivado = false,
  color = 'primary',
  criterios = [],
  icono = 'swap_vert',
  cambioCriterios,
  label,
  id,
}: BotonOrdenarParams) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const desplegarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const cerrarMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        id={id}
        aria-label={label}
        size="small"
        onClick={desplegarMenu}
        color="primary"
        style={{ textTransform: 'none' }}
      >
        <Badge
          color="secondary"
          variant="dot"
          badgeContent={
            criterios.filter((value) => value.ordenar && value.orden).length
          }
        >
          <Icono color={desactivado ? 'disabled' : color}>{icono}</Icono>
        </Badge>
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
        autoFocus={false}
      >
        {criterios
          .filter((value) => value.ordenar)
          .map((accion, index) => (
            <MenuItem
              sx={{ p: 2 }}
              id={`${index}-id-orden`}
              key={`${index}-id-orden`}
              onClick={() => {
                cerrarMenu()
                const nuevosCriterios = [...criterios] // crea una copia del array original

                cambioCriterios(
                  nuevosCriterios.map((value, indice) => ({
                    ...value,
                    ...{
                      orden:
                        index == indice ? ToggleOrden(value.orden) : undefined,
                    },
                  }))
                )
              }}
            >
              {accion.orden && (
                <Icono color={'primary'} fontSize={'small'}>
                  {accion.orden == 'asc' ? 'north' : 'south'}
                </Icono>
              )}
              {!accion.orden && <Box width={'25px'} />}
              <Box width={'20px'} />
              <Typography variant={'body2'}>{accion.nombre}</Typography>
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}
