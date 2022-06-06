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
import { useAuth } from '../../context/auth'
import { LayoutUser } from '../../common/components/layouts'
import React, { useState } from 'react'
import { siteName, titleCase } from '../../common/utils'
import { CustomDialog, Icono } from '../../common/components/ui'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { formatoFecha } from '../../common/utils/fechas'
import { CambioPassModal } from '../../modules/admin/perfil/CambioPassModal'
import Image from 'next/image'
import { useThemeContext } from '../../context/ui/ThemeContext'
import { Constantes } from '../../config'
import { imprimir } from '../../common/utils/imprimir'

const Perfil: NextPage = () => {
  const { usuario } = useAuth()

  const { themeMode } = useThemeContext()

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const [modalAyuda, setModalAyuda] = useState(false)

  const abrirModalAyuda = () => {
    setModalAyuda(true)
  }
  const cerrarModalAyuda = () => {
    setModalAyuda(false)
  }

  return (
    <>
      <CustomDialog
        isOpen={modalAyuda}
        handleClose={cerrarModalAyuda}
        title={'Cambio de contraseña'}
      >
        <CambioPassModal
          accionCorrecta={cerrarModalAyuda}
          accionCancelar={cerrarModalAyuda}
        />
      </CustomDialog>
      <LayoutUser
        title={`Perfil - ${titleCase(
          usuario?.persona.nombres ?? ''
        )} - ${siteName()}`}
      >
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
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant={'subtitle2'}
                    >
                      Usuario
                    </Typography>
                    <Typography sx={{}}>{`@${usuario?.usuario}`}</Typography>
                  </Grid>
                  <Box height={'20px'} />
                  <Grid
                    container
                    justifyContent="space-between"
                    direction={'column'}
                  >
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant={'subtitle2'}
                    >
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
                      <Typography
                        sx={{ fontWeight: 'bold' }}
                        variant={'subtitle2'}
                      >
                        Fecha de nacimiento
                      </Typography>
                    )}
                    {usuario?.persona.fechaNacimiento && (
                      <Typography variant={'body1'}>
                        {formatoFecha(
                          usuario?.persona.fechaNacimiento,
                          'DD/MM/YYYY'
                        )}
                      </Typography>
                    )}
                  </Grid>
                  <Box height={'20px'} />
                  <Grid
                    container
                    justifyContent="space-between"
                    direction={'column'}
                  >
                    <Typography
                      sx={{ fontWeight: 'bold' }}
                      variant={'subtitle2'}
                    >
                      Roles
                    </Typography>
                    <Grid>
                      {usuario?.roles.map((itemUsuarioRol, index) => (
                        <Chip
                          key={`${index}-idRol`}
                          label={itemUsuarioRol.rol}
                        />
                      ))}
                    </Grid>
                  </Grid>
                  <Box height={'30px'} />
                  {!usuario?.ciudadania_digital && (
                    <Box display={'flex'}>
                      <Button
                        size="large"
                        onClick={() => {
                          abrirModalAyuda()
                        }}
                        color="primary"
                        variant="contained"
                        style={{ textTransform: 'none' }}
                      >
                        <Icono color={'inherit'}>vpn_key</Icono>
                        <Box width={'10px'} />
                        <Typography
                          sx={{ fontWeight: 'bold' }}
                          variant={'body2'}
                        >
                          Cambiar contraseña
                        </Typography>
                      </Button>
                    </Box>
                  )}
                  {usuario?.ciudadania_digital && (
                    <Box display={'flex'}>
                      <Button
                        size="large"
                        sx={{
                          borderRadius: 2,
                          backgroundColor: 'background.paper',
                        }}
                        variant="outlined"
                        style={{ textTransform: 'none' }}
                        onClick={() => {
                          imprimir(`Abriendo: ${Constantes.ciudadaniaUrl}`)
                          window.open(Constantes.ciudadaniaUrl, '_blank')
                        }}
                      >
                        <Image
                          src={
                            themeMode == 'light'
                              ? '/logo_ciudadania2.png'
                              : '/logo_ciudadania2_dark.png'
                          }
                          alt="Ingresar con Ciudadanía Digital"
                          width="37"
                          height="30"
                        />
                        <Typography
                          sx={{ fontWeight: 'bold', pl: 1, pr: 1 }}
                          variant={'body2'}
                        >
                          Ver perfil en Ciudadanía Digital
                        </Typography>
                        <Box width={'10px'} />
                        <Icono color={'inherit'}>north_east</Icono>
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </LayoutUser>
    </>
  )
}

export default Perfil
