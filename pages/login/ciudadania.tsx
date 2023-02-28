import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { FullScreenLoading } from '../../common/components/ui/FullScreenLoading'
import { useRouter } from 'next/router'
import { delay, guardarCookie, InterpreteMensajes } from '../../common/utils'
import { Servicios } from '../../common/services'
import { Constantes } from '../../config'
import { imprimir } from '../../common/utils/imprimir'
import { useAlerts } from '../../common/hooks'
import { useAuth } from '../../context/auth'

const Ciudadania: NextPage = () => {
  const router = useRouter()
  // Hook para mostrar alertas
  const { Alerta } = useAlerts()
  const { cargarUsuarioManual } = useAuth()

  const autorizarCiudadania = async (parametros: any) => {
    try {
      const respuesta = await Servicios.get({
        url: `${Constantes.baseUrl}/ciudadania-autorizar`,
        body: {},
        params: parametros,
        headers: {
          accept: 'application/json',
        },
      })

      imprimir(`Sesión Autorizada`, respuesta)
      guardarCookie('token', respuesta.access_token)
      await cargarUsuarioManual()
    } catch (e) {
      imprimir(`Error al autorizar sesión`, e)
      Alerta({ mensaje: `${InterpreteMensajes(e)}`, variant: 'error' })
    }
  }

  const validar = async () => {
    imprimir(`router.query: `, router.query)

    if (
      Object.keys(router.query).length == 0 ||
      Object.keys(router.query).includes('error')
    ) {
      await router.replace({
        pathname: '/login',
      })
      return
    }

    await delay(1000)
    await autorizarCiudadania(router.query)
  }

  useEffect(() => {
    if (!router.isReady) return
    validar().finally(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  return (
    <Box minHeight="100vh">
      <FullScreenLoading mensaje={'Ingresando con Ciudadanía'} />
    </Box>
  )
}

export default Ciudadania
