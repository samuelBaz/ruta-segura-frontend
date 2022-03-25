import type { NextPage } from 'next'
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import React from 'react'
import { formatoFecha, titleCase } from '../utils'
import { Icono } from '../components/ui'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

const Home: NextPage = () => {
  const { usuario } = useAuth()

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <LayoutUser title={`Perfil - ${titleCase(usuario?.persona.nombres ?? '')}`}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
          Perfil
        </Typography>
      </Grid>
      <Box height={'20px'} />
      <Grid container>
        <Grid item xl={6} md={6} xs={12}>
          <Box>
            <Card sx={{ borderRadius: 3 }}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  width: '100%',
                  height: sm || xs ? '' : 370,
                  // backgroundColor: 'primary.main',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.1s ease-out !important',
                  p: 2,
                }}
              >
                <AccountCircleOutlinedIcon
                  sx={{ fontSize: 100, color: 'text.secondary' }}
                />

                <Typography variant={'body1'} color="text.secondary">
                  {titleCase(
                    `${usuario?.persona.nombres} ${usuario?.persona.primerApellido} ${usuario?.persona.segundoApellido}`
                  )}
                </Typography>
              </Box>
            </Card>
          </Box>
        </Grid>
        <Grid
          item
          xl={6}
          md={6}
          xs={12}
          sx={{ pl: sm || xs ? 0 : 6, pr: sm || xs ? 0 : 6 }}
        >
          <Box justifyContent={'center'} alignItems={'center'}>
            <Box justifyContent={'center'} alignItems={'center'}>
              <Grid container direction={'column'}>
                <Box height={'20px'} />
                <Grid
                  container
                  justifyContent="space-between"
                  direction={'column'}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Usuario</Typography>
                  <Typography sx={{}}>{`@${usuario?.usuario}`}</Typography>
                </Grid>
                <Box height={'20px'} />
                <Grid
                  container
                  justifyContent="space-between"
                  direction={'column'}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>
                    Número de documento
                  </Typography>
                  <Typography variant={'body1'}>
                    {`${usuario?.persona.tipoDocumento} ${usuario?.persona.nroDocumento}`}
                  </Typography>
                </Grid>
                <Box height={'20px'} />
                <Grid
                  container
                  justifyContent="space-between"
                  direction={'column'}
                >
                  {usuario?.persona.fechaNacimiento && (
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Fecha de nacimiento
                    </Typography>
                  )}
                  {usuario?.persona.fechaNacimiento && (
                    <Typography variant={'body1'}>
                      {`${formatoFecha(
                        usuario?.persona.fechaNacimiento,
                        'DD-MM-YYYY',
                        'DD/MM/YYYY'
                      )}`}
                    </Typography>
                  )}
                </Grid>
                <Box height={'20px'} />
                <Grid
                  container
                  justifyContent="space-between"
                  direction={'column'}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>Roles</Typography>
                  <Grid>
                    {usuario?.roles.map((itemUsuarioRol, index) => (
                      <Chip key={`${index}-idRol`} label={itemUsuarioRol.rol} />
                    ))}
                  </Grid>
                </Grid>

                <Box height={'30px'} />
                <Box display={'flex'}>
                  <Button
                    size="large"
                    onClick={() => {}}
                    color="primary"
                    variant="contained"
                    style={{ textTransform: 'none' }}
                  >
                    <Icono color={'inherit'}>vpn_key</Icono>
                    <Box width={'10px'} />
                    <Typography sx={{ fontWeight: 'bold' }} variant={'body2'}>
                      Cambiar contraseña
                    </Typography>
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LayoutUser>
  )
}
export default Home
