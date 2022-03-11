import * as React from 'react'
import type { NextPage } from 'next'
import { LayoutLogin } from '../components/layouts/LayoutLogin'
import Grid from '@mui/material/Grid'
import { Box, Button, Divider, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'

const Home: NextPage = () => {
  return (
    <LayoutLogin title={'Proyecto base'}>
      <Grid container justifyContent="space-evenly" alignItems={'center'}>
        <Grid item xl={5} md={5} xs={12}>
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
          sx={{ display: { xs: 'none', xl: 'block', md: 'block', sm: 'none' } }}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            minHeight={'80vh'}
          >
            <Divider variant={'middle'} orientation="vertical" flexItem />
          </Box>
        </Grid>
        <Grid item xl={5} md={5} xs={12}>
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
              <Button variant="contained">Ingresar</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LayoutLogin>
  )
}
export default Home
