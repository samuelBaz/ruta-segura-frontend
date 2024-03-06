import React, { ReactNode, useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material'
import { ListSkeleton } from '../../../../common/components/ui'
import { CriterioOrdenType } from '../../../../common/components/ui/datatable/ordenTypes'

export interface CustomDataTableTypeCards {
  titulo?: string
  tituloPersonalizado?: ReactNode
  cabeceraPersonalizada?: ReactNode
  error?: boolean
  cargando?: boolean
  acciones?: Array<ReactNode>
  cambioOrdenCriterios?: (nuevosCriterios: Array<CriterioOrdenType>) => void
  columnas: Array<CriterioOrdenType>
  filtros?: ReactNode
  contenidoTabla: Array<Array<ReactNode>>
  paginacion?: ReactNode
  seleccionable?: boolean
  seleccionados?: (indices: Array<number>) => void
}

export const CardItemTable = ({
  titulo,
  tituloPersonalizado,
  cabeceraPersonalizada,
  error = false,
  cargando = false,
  acciones = [],

  filtros,
  contenidoTabla,
  paginacion,
  seleccionable,
  seleccionados,
}: CustomDataTableTypeCards) => {
  const [todoSeleccionado, setTodoSeleccionado] = useState(false)

  const [indicesSeleccionados, setIndicesSeleccionados] = useState<
    Array<boolean>
  >([])

  useEffect(
    () => {
      if (seleccionados) {
        seleccionados(
          indicesSeleccionados.reduce(
            (resulltado: Array<number>, value, index) => {
              if (value) {
                resulltado.push(index)
              }
              return resulltado
            },
            []
          )
        )
      }

      if (
        indicesSeleccionados.filter((value) => value).length ==
        indicesSeleccionados.length
      )
        setTodoSeleccionado(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(indicesSeleccionados)]
  )

  useEffect(
    () => {
      setIndicesSeleccionados(
        new Array(contenidoTabla.length).fill(todoSeleccionado)
      )
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [todoSeleccionado]
  )

  useEffect(
    () => {
      if (!cargando) {
        setIndicesSeleccionados(new Array(contenidoTabla.length).fill(false))
        setTodoSeleccionado(false)
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [cargando, contenidoTabla.length]
  )

  return (
    <Box sx={{ pb: 2 }}>
      {/*título y acciones*/}
      {/*{!cabeceraPersonalizada && ( */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {titulo ? (
          <Typography variant={'h5'} sx={{ fontWeight: '600', pl: 1 }}>
            {`${titulo}`}
          </Typography>
        ) : tituloPersonalizado ? (
          tituloPersonalizado
        ) : (
          <Box />
        )}
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {seleccionable &&
              indicesSeleccionados.filter((value) => value).length > 0 && (
                <Box sx={{ mx: 1 }}>
                  <Typography key={'contador'} variant={'subtitle2'}>
                    {`${
                      indicesSeleccionados.filter((value) => value).length
                    } seleccionados`}
                  </Typography>
                </Box>
              )}
            {acciones.map((accion, index) => (
              <div key={`accion-id-${index}`}>{accion}</div>
            ))}
          </Grid>
        </Box>
      </Grid>
      {/*)}*/}
      {cabeceraPersonalizada && cabeceraPersonalizada}
      {/* filtros */}
      <Box
        sx={{
          pt: filtros ? 1 : 2,
          pb: filtros ? 3 : 1,
        }}
      >
        {filtros}
      </Box>
      {/*Contenedor de la tabla*/}
      {
        <Box>
          {error ? (
            <TableContainer>
              <Table>
                <TableBody>
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
                </TableBody>
              </Table>
            </TableContainer>
          ) : contenidoTabla.length == 0 && !cargando ? (
            <TableContainer>
              <Table>
                <TableBody>
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
                            {`Sin registros`}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box>
              {cargando ? (
                <ListSkeleton filas={10} />
              ) : (
                <div>
                  <Grid
                    container
                    direction="row"
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 2, sm: 8, md: 12, xl: 12 }}
                  >
                    {contenidoTabla.map((contenidoFila, index) => (
                      <Grid
                        item
                        xs={2}
                        sm={4}
                        md={4}
                        lg={3}
                        key={`celda-id-${index}`}
                      >
                        {contenidoFila.map((contenido, indexContenido) => (
                          <Grid
                            key={`Grid-id-${index}-${indexContenido}`}
                            height={'100%'}
                          >
                            {contenido}
                          </Grid>
                        ))}
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
              {paginacion}
            </Box>
          )}
        </Box>
      }
    </Box>
  )
}
