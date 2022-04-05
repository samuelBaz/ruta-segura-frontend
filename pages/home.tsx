import type { NextPage } from 'next'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material'
import { useAuth } from '../context/auth'
import { LayoutUser } from '../components/layouts'
import { Icono } from '../components/ui'
import { useRouter } from 'next/router'
import { titleCase } from '../utils'

const Home: NextPage = () => {
  const { usuario, rolUsuario, idRolUsuario } = useAuth()

  const router = useRouter()

  return (
    <LayoutUser title={'Home - Frontend Base'}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid>
          <Typography
            variant={'h5'}
            component="h1"
            noWrap={true}
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            Bienveni@ {titleCase(usuario?.persona?.nombres ?? '')}{' '}
            {titleCase(
              usuario?.persona?.primerApellido ??
                usuario?.persona?.segundoApellido ??
                ''
            )}
          </Typography>
          <Typography variant={'subtitle2'} color="text.secondary">
            {rolUsuario?.nombre}
          </Typography>
        </Grid>
      </Grid>
      <Grid>
        <Box height={'20px'} />
        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          Puedes ver los siguientes modulos:
        </Typography>
        <Box height={'10px'} />
      </Grid>

      <Grid container direction="row" alignItems="center">
        <Grid container direction="row">
          {usuario?.roles
            .filter((ur) => ur.idRol == idRolUsuario)
            .map((rolUsuario, index) => (
              <div key={`usuario-${index}`}>
                {rolUsuario.modulos.map((modulo, index1) => (
                  <Grid
                    container
                    direction="row"
                    key={`rolUsuario-${index}-${index1}`}
                  >
                    <Grid>
                      <Box height={'20px'} />
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: 14, fontWeight: 'bold' }}
                      >
                        {modulo.label}
                      </Typography>
                      <Box height={'20px'} />
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      spacing={{ xs: 2, md: 3 }}
                      columns={{ xs: 4, sm: 8, md: 12, xl: 12 }}
                    >
                      {modulo.subModulo.map((subModulo, index2) => (
                        <Grid
                          item
                          xs={2}
                          sm={4}
                          md={4}
                          key={`$subModulo-${index}-${index1}-${index2}`}
                        >
                          <CardActionArea
                            sx={{
                              borderRadius: 3,
                            }}
                            onClick={async () => {
                              await router.push(subModulo.url)
                            }}
                          >
                            <Card
                              sx={{
                                borderRadius: 3,
                              }}
                            >
                              <CardContent>
                                <Grid container direction="row">
                                  <Icono>{subModulo.propiedades.icono}</Icono>
                                  <Box height={'30px'} width={'10px'} />
                                  <Typography
                                    sx={{ fontSize: 14 }}
                                    color="text.secondary"
                                    gutterBottom
                                  >
                                    {`${subModulo.label}`}
                                  </Typography>
                                </Grid>
                                <Typography variant="body2">
                                  {`${subModulo.propiedades.descripcion}`}
                                </Typography>
                              </CardContent>
                            </Card>
                          </CardActionArea>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </div>
            ))}
        </Grid>
      </Grid>
    </LayoutUser>
  )
}
export default Home
