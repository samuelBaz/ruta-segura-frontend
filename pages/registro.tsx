import { NextPage } from 'next'
import { LayoutLogin } from '../common/components/layouts'
import { Box, Card } from '@mui/material'
import { useAlerts } from '../common/hooks'
import { useFullScreenLoading } from '../context/ui'
import { delay, InterpreteMensajes, siteName } from '../common/utils'
import { Constantes } from '../config'
import { Servicios } from '../common/services'
import { imprimir } from '../common/utils/imprimir'
import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import RegistroContainer from '../modules/login/ui/RegistroContainer'

const Registro: NextPage = () => {

  const { Alerta } = useAlerts()
  const { mostrarFullScreen, ocultarFullScreen } = useFullScreenLoading()

  const obtenerEstado = async () => {
    try {
      mostrarFullScreen()
      await delay(1000)
      const respuesta = await Servicios.get({
        url: `${Constantes.baseUrl}/estado`,
        body: {},
        headers: {
          accept: 'application/json',
        },
      })
      imprimir(`Se obtuvo el estado 🙌`, respuesta)
    } catch (e) {
      imprimir(`Error al obtener estado`, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    } finally {
      ocultarFullScreen()
    }
  }
  useEffect(() => {
    obtenerEstado().then(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LayoutLogin title={siteName()}>
      <Grid container justifyContent="space-evenly" alignItems={'center'}>
        <Grid item xl={4} md={5} xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              color={'primary'}
            >
              <Card sx={{ borderRadius: 4, p: 2, maxWidth: '450px' }}>
                <Box
                  display={'grid'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ borderRadius: 12, paddingX: 2 }}
                >
                  <RegistroContainer />
                </Box>
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LayoutLogin>
  )
}

export default Registro
