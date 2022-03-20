import type { NextPage } from 'next'
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Icono from '../components/ui/Icono'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

const Home: NextPage = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ]

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ]

  return (
    <LayoutUser>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="initial"
        justifyItems={'center'}
        style={{ minHeight: '80vh' }}
      >
        <div style={{ height: '75vh', width: '90%' }}>
          <>
            <Box height={'30px'} />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
                Usuarios
              </Typography>
              <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Tooltip title={'Agregar'}>
                    <IconButton
                      aria-label="close"
                      onClick={function () {}}
                      color={'primary'}
                      sx={{}}
                    >
                      <Icono>add</Icono>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Buscar'}>
                    <IconButton
                      aria-label="close"
                      onClick={function () {}}
                      color={'primary'}
                      sx={{}}
                    >
                      <Icono>search</Icono>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={'Actualizar'}>
                    <IconButton
                      aria-label="close"
                      onClick={function () {}}
                      color={'primary'}
                      sx={{}}
                    >
                      <Icono>refresh</Icono>
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Typography>
            </Grid>

            <Box height={'30px'} />
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </>
        </div>
      </Grid>
    </LayoutUser>
  )
}
export default Home
