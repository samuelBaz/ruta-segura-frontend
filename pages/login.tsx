import * as React from 'react'
import type { NextPage } from 'next'
import { LayoutLogin } from '../components/layouts/LayoutLogin'
import Grid from '@mui/material/Grid'
import { Box, Button, Divider, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { imprimir } from '../utils'
import { Constantes } from '../config'
import { Servicios } from '../services'
import { Alertas } from '../components/ui'

const Home: NextPage = () => {
  const iniciarSesion = async () => {
    imprimir(`Intento de inicio de sesión: ${Constantes.randomNumbers}`)

    try {
      const respuesta = await Servicios.get({
        url: 'https://httpstat.us/200',
        body: {},
        headers: {},
      })
      Alertas.correcto(`respuesta correcta: ${respuesta}`)
      imprimir(`Se obtuvieron números aleatorios: ${JSON.stringify(respuesta)}`)
    } catch (e) {
      imprimir(`Error al obtener números aleatorios: ${e}`)
      Alertas.error(`Error al obtener números aleatorios: ${e}`)
    }
  }

  return (
    <>
      <LayoutLogin title={'Frontend base - NextJS'}>
        <Grid container justifyContent="space-evenly" alignItems={'center'}>
          <Grid item xl={6} md={5} xs={12}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={'80vh'}
              color={'primary'}
            >
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minHeight={'80vh'}
              >
                <Typography variant={'h4'} component="h1" color={'primary'}>
                  Frontend base con Next.js, MUI v5 y TypeScript
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sx={{
              display: { xs: 'none', xl: 'block', md: 'block', sm: 'none' },
            }}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={'80vh'}
            >
              <Divider
                variant={'middle'}
                sx={{ marginTop: '60px', marginBottom: '60px' }}
                orientation="vertical"
                flexItem
              />
            </Box>
          </Grid>
          <Grid item xl={4} md={5} xs={12}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              minHeight={'80vh'}
              color={'primary'}
            >
              <Box
                display={'grid'}
                justifyContent={'center'}
                alignItems={'center'}
                height={400}
                maxWidth={450}
              >
                <Typography
                  align={'center'}
                  color={'primary'}
                  sx={{ flexGrow: 1, fontWeight: 'bold' }}
                >
                  Iniciar Sesión
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Ingresa con el usuario y contraseña. Si estas en el frontend
                  base son ADMINISTRADOR / 123
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>Usuario</Typography>
                <TextField
                  id="usuario"
                  defaultValue="ADMINISTRADOR"
                  variant="outlined"
                />
                <Typography sx={{ fontWeight: 'bold' }}>Contraseña</Typography>
                <TextField id="usuario" defaultValue="123" variant="outlined" />
                <Button variant="contained" onClick={iniciarSesion}>
                  Ingresar
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </LayoutLogin>
    </>
  )
}
export default Home
