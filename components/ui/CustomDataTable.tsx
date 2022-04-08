import React, { ReactNode, useState } from 'react'
import { ColumnaType } from '../../types'
import {
  Box,
  Card,
  CardContent,
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
  filtros?: ReactNode
  contenidoTabla: Array<Array<ReactNode>>
  paginacion?: ReactNode
}

export const CustomDataTable = ({
  titulo,
  error = false,
  cargando = false,
  acciones,
  columnas,
  filtros,
  contenidoTabla,
  paginacion,
}: CustomDataTableType) => {
  const theme = useTheme()
  // const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const [mostrarFiltro, setMostrarFiltro] = useState(false)
  return (
    <Box sx={{ pb: 2 }}>
      {/*titulo y acciones*/}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant={'h5'} sx={{ fontWeight: 'bold', pl: 1 }}>
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
              {!!filtros && (
                <div key={`accion-filtro`}>
                  <IconoTooltip
                    titulo={
                      mostrarFiltro ? 'Ocultar filtros' : 'Mostrar filtros'
                    }
                    accion={() => {
                      setMostrarFiltro(!mostrarFiltro)
                    }}
                    icono={mostrarFiltro ? 'filter_list_off' : 'filter_list'}
                    name={mostrarFiltro ? 'Ocultar filtros' : 'Mostrar filtros'}
                  />
                </div>
              )}
            </Grid>
          </Typography>
        </Fade>
      </Grid>
      <Box height={xs ? '20px' : '20px'} />
      {/* filtros */}
      <Collapse in={mostrarFiltro} sx={{}}>
        <Card
          sx={{
            borderRadius: 4,
            pt: 2,
            pb: 2,
            pl: 3,
            pr: 3,
            mb: mostrarFiltro ? 3 : 0,
          }}
        >
          {filtros}
        </Card>
      </Collapse>
      {/*Contenedor de la tabla*/}
      <Card
        sx={{
          borderRadius: 4,
          pt: 0,
          pl: { sm: 3, md: 3, xl: 3 },
          pr: { sm: 3, md: 3, xl: 3 },
          pb: { sm: 3, md: 3, xl: 3 },
          mb: { sm: 3, md: 3, xl: 3 },
          backgroundColor: xs
            ? {
                sm: 'inherit',
                xs: 'inherit',
              }
            : {},
        }}
      >
        {cargando ? (
          <>
            {xs ? (
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
            ) : (
              <Box>
                {xs ? (
                  <div>
                    {contenidoTabla.map((contenidoFila, index) => (
                      <Card // en lugar de CardActionArea para no usar hover en movil
                        sx={{
                          borderRadius: 3,
                          mb: 2,
                        }}
                        key={`row-id-${index}`}
                      >
                        <Card
                          key={`celda-id-${index}`}
                          sx={{
                            borderRadius: 3,
                          }}
                        >
                          <CardContent>
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
                          </CardContent>
                        </Card>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <TableContainer>
                    <Table>
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
                    </Table>
                  </TableContainer>
                )}
                {paginacion}
              </Box>
            )}
          </Fade>
        )}
      </Card>
    </Box>
  )
}
