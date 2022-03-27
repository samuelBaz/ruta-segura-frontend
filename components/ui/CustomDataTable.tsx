import React, { ReactNode, useState } from 'react'
import { ColumnaType } from '../../types'
import {
  Box,
  Collapse,
  Fade,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { ListSkeleton, TableSkeleton } from './CustomSkeleton'
import { IconoTooltip } from './IconoTooltip'

export interface CustomDataTableType {
  titulo: string
  error: boolean
  cargando?: boolean
  acciones: Array<ReactNode>
  columnas: Array<ColumnaType>
  filtros?: Array<ReactNode>
  contenidoTabla: Array<Array<ReactNode>>
  paginacion?: ReactNode
}

export const CustomDataTable = ({
  titulo,
  error = false,
  cargando = false,
  acciones,
  columnas,
  filtros = [],
  contenidoTabla,
  paginacion,
}: CustomDataTableType) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const [mostrarFiltro, setMostrarFiltro] = useState(false)
  return (
    <div>
      {/*titulo y acciones*/}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant={'h5'}
          sx={{ fontWeight: 'bold' }}
          color={'text.secondary'}
        >
          {`${titulo}`}
        </Typography>
        <Fade in={!cargando} timeout={0}>
          <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {acciones.map((accion, index) => (
                <div key={`accion-id-${index}`}>{accion}</div>
              ))}
              {filtros?.length > 0 && (
                <div key={`accion-filtro`}>
                  <IconoTooltip
                    titulo={
                      mostrarFiltro ? 'Ocultar filtros' : 'Mostrar filtros'
                    }
                    accion={() => {
                      setMostrarFiltro(!mostrarFiltro)
                    }}
                    icono={mostrarFiltro ? 'filter_list_off' : 'filter_list'}
                  />
                </div>
              )}
            </Grid>
          </Typography>
        </Fade>
      </Grid>
      <Box height={'30px'} />
      {/* filtros */}
      <Collapse in={mostrarFiltro}>
        <Grid
          container
          direction="row"
          spacing={{ xs: 1, md: 3 }}
          columns={{ xs: 1, sm: 12, md: 12, xl: 12 }}
          sx={{ pb: 2 }}
        >
          {filtros.map((filtro, index) => (
            <Grid item xs={2} sm={4} md={3} key={`filtro-id-${index}`}>
              {filtro}
            </Grid>
          ))}
        </Grid>
      </Collapse>
      {/*Contenedor de la tabla*/}
      {cargando ? (
        <>
          {sm || xs ? (
            <ListSkeleton filas={5} />
          ) : (
            <TableSkeleton filas={5} columnas={5} />
          )}
        </>
      ) : (
        <Fade in={!cargando} timeout={1000}>
          {error ? (
            <TableContainer>
              <Table>
                <TableRow>
                  <TableCell />
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Grid
                      container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      justifyItems={'center'}
                    >
                      <Grid item xs={3} xl={4}>
                        <Typography
                          variant={'body1'}
                          component="h1"
                          noWrap={true}
                          alignItems={'center'}
                        >
                          {`Error obteniendo información`}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          ) : (
            <Box>
              <TableContainer>
                <Table>
                  {sm || xs ? (
                    <TableHead />
                  ) : (
                    <TableHead>
                      <TableRow>
                        {columnas.map((columna, index) => (
                          <TableCell key={`cabecera-id-${index}`}>
                            <Typography variant={'caption'}>
                              {columna.nombre}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                  )}
                  {sm || xs ? (
                    <TableBody>
                      {contenidoTabla.map((contenidoFila, index) => (
                        <TableRow key={`row-id-${index}`} hover={true}>
                          <TableCell key={`celda-id-${index}`}>
                            {contenidoFila.map((contenido, indexContenido) => (
                              <Grid
                                key={`Grid-id-${index}-${indexContenido}`}
                                container
                                direction="row"
                                paddingTop={'5px'}
                                paddingBottom={'5px'}
                                justifyContent="space-between"
                                alignItems="center"
                              >
                                <Typography
                                  color="text.secondary"
                                  variant={'subtitle2'}
                                >
                                  {columnas[indexContenido].nombre}
                                </Typography>
                                {contenido}
                              </Grid>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  ) : (
                    <TableBody>
                      {contenidoTabla.map(
                        (contenidoFila, indexContenidoTabla) => (
                          <TableRow
                            key={`row-id-${indexContenidoTabla}`}
                            hover={true}
                          >
                            {contenidoFila.map(
                              (contenido, indexContenidoFila) => (
                                <TableCell
                                  key={`celda-id-${indexContenidoTabla}-${indexContenidoFila}`}
                                >
                                  {contenido}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
              {paginacion}
            </Box>
          )}
        </Fade>
      )}
    </div>
  )
}
