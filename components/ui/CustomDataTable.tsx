import React, { ReactNode } from 'react'
import { ColumnaType } from '../../types'
import {
  Box,
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

export interface DataTableType {
  titulo: string
  acciones: Array<ReactNode>
  columnas: Array<ColumnaType>
  contenidoTabla: Array<Array<ReactNode>>
}

export const CustomDataTable = ({
  titulo,
  acciones,
  columnas,
  contenidoTabla,
}: DataTableType) => {
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
      </Grid>
      <Box height={'30px'} />
      {/*Contenedor de la tabla*/}
      <TableContainer>
        <Table>
          {sm || xs ? (
            <TableHead />
          ) : (
            <TableHead>
              <TableRow>
                {columnas.map((columna, index) => (
                  <TableCell key={`cabecera-id-${index}`}>
                    {columna.nombre}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}

          {sm || xs ? (
            <TableBody>
              {contenidoTabla.map((contenidoFila, index) => (
                <TableRow key={`row-id-${index}`}>
                  <TableCell key={`celda-id-${index}`}>
                    {contenidoFila.map((contenido, indexContenido) => (
                      <Grid
                        key={`Grid-id-${index}-${indexContenido}`}
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography>
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
              {contenidoTabla.map((contenidoFila, indexContenidoTabla) => (
                <TableRow key={`row-id-${indexContenidoTabla}`}>
                  {contenidoFila.map((contenido, indexContenidoFila) => (
                    <TableCell
                      key={`celda-id-${indexContenidoTabla}-${indexContenidoFila}`}
                    >
                      {contenido}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}
