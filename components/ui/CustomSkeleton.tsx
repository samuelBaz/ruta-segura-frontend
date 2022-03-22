import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import React from 'react'

export const CustomSkeleton = () => {
  return <Skeleton />
}

export interface TableSkeletonType {
  filas: number
  columnas: number
}

export const TableSkeleton = ({ filas, columnas }: TableSkeletonType) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {Array(filas)
              .fill(0)
              .map((e, fila) => (
                <TableRow key={`skeleton-row-${fila}`}>
                  {Array(columnas)
                    .fill(0)
                    .map((e, columna) => (
                      <TableCell key={`skeleton-cell-${columna}`}>
                        <Skeleton
                          key={`$skeleton-${fila}-${columna}`}
                          variant={'text'}
                          height={'20px'}
                        />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
