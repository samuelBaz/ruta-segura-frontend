import type { NextPage } from 'next'
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material'
import { delay } from '../../../../common/utils'
import Image from 'next/image'
import { CustomDialog, Icono } from '../../../../common/components/ui'
import LoginContainer from '../../../../modules/login/ui/LoginContainer'
import { useTheme } from '@mui/material'
import camion from './../../../assets/envio-camion.png'
import { useState } from 'react'
const TestLogin: NextPage = () => {
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const [modalLogin, setModalLogin] = useState(false)
  const cerrarModalLogin = async () => {
    setModalLogin(false)
    await delay(500)
  }

  return (
    <Box>
      <Grid item xl={6} md={5} xs={12}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={sm || xs ? '30vh' : '80vh'}
          color={'primary'}
        >
          <Box
            display="flex"
            flexDirection={'column'}
            boxShadow={2}
            width={sm || xs ? '80%' : '40%'}
            borderRadius={3}
            paddingY={4}
            paddingX={xs ? 2 : 5}
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection={sm || xs ? 'column' : 'row'}
              >
                <Image
                  src={camion}
                  alt={'login'}
                  width="60"
                  height="60"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
                <Box width={10}></Box>
                <Typography
                  variant={'h6'}
                  component="h6"
                  fontWeight={'500'}
                  align={sm || xs ? 'center' : 'left'}
                >
                  Sistema de Delivery
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="column"
                mt={2}
              >
                <Typography
                  variant={'body1'}
                  component="h6"
                  fontWeight={'500'}
                  align="center"
                >
                  Acceso para Administradores
                </Typography>
                <Box width={10}></Box>
                <Typography
                  variant={'body2'}
                  component="h6"
                  fontWeight={'300'}
                  align="center"
                >
                  Al ingresar tendrás acceso a los siguientes módulos
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              display={'flex'}
              mt={3}
              justifyContent={'start'}
              flexDirection={'column'}
            >
              <Box
                display="flex"
                alignItems="start"
                //flexDirection={sm || xs ? 'row' : 'column'}
                flexDirection="row"
              >
                <Icono
                  fontSize={'large'}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  local_shipping
                </Icono>
                <Box width={20}></Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6" fontWeight={'600'} fontSize={15}>
                    Gestión de pedidos
                  </Typography>
                  <Typography variant="body1" fontWeight={300} fontSize={13}>
                    Organización y logística de pedidos
                  </Typography>
                </Box>
              </Box>
              <Box height={20}></Box>
              <Box
                display="flex"
                alignItems="start"
                //flexDirection={sm || xs ? 'row' : 'column'}
                flexDirection="row"
              >
                <Icono
                  fontSize={'large'}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  scale
                </Icono>
                <Box width={20}></Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6" fontWeight={'600'} fontSize={15}>
                    Reglas de pesos
                  </Typography>
                  <Typography variant="body1" fontWeight={300} fontSize={13}>
                    Establecer rangos de peso para transporte
                  </Typography>
                </Box>
              </Box>
              <Box height={20}></Box>
              <Box
                display="flex"
                alignItems="start"
                //flexDirection={sm || xs ? 'row' : 'column'}
                flexDirection="row"
              >
                <Icono
                  fontSize={'large'}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  map
                </Icono>
                <Box width={20}></Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6" fontWeight={'600'} fontSize={15}>
                    Zonas de operación
                  </Typography>
                  <Typography variant="body1" fontWeight={300} fontSize={13}>
                    Definir áreas donde se realizaran las entregas
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={20} paddingX={6}>
              <Box sx={{ height: 30 }}></Box>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: theme.palette.primary.main,
                }}
                onClick={() => setModalLogin(true)}
              >
                <Typography sx={{ fontWeight: '600' }}>
                  Iniciar sesión
                </Typography>
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <CustomDialog
        isOpen={modalLogin}
        handleClose={cerrarModalLogin}
        title={''}
        maxWidth="xs"
      >
        <Box>
          <Box
            display={'flex'}
            justifyContent={'space-around'}
            alignItems={'center'}
            color={'primary'}
            padding={2}
          >
            <LoginContainer />
          </Box>
        </Box>
      </CustomDialog>
    </Box>
  )
}
export default TestLogin
