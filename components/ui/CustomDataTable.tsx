import React, { ReactNode } from 'react'
import { ColumnaType } from '../../types'
import {
  Box,
  Button,
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
import { imprimir } from '../../utils'

export interface CustomDataTableType {
  titulo: string
  error: boolean
  cargando?: boolean
  acciones: Array<ReactNode>
  columnas: Array<ColumnaType>
  contenidoTabla: Array<Array<ReactNode>>
}

export const CustomDataTable = ({
  titulo,
  error = false,
  cargando = false,
  acciones,
  columnas,
  contenidoTabla,
}: CustomDataTableType) => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
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
            </Grid>
          </Typography>
        </Fade>
      </Grid>
      <Box height={'30px'} />
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
          )}
        </Fade>
      )}
    </div>
  )
}
