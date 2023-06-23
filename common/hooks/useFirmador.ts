import axios from 'axios'
import { Constantes } from '../../config'
import { estadosCorrectos } from '../services'
import { decodeBase64, encodeBase64 } from '../utils'
import { imprimir } from '../utils/imprimir'

const useFirmador = () => {
  const crearDocumentoEnviar = (
    archivoDoc: string | object,
    formato: string,
    nombreArchivo: string
  ) => {
    let documento
    if (formato === 'pdf') {
      documento = {
        archivo: [
          {
            base64: `data:application/pdf;base64,${archivoDoc}`,
            name: `${nombreArchivo}.${formato}`,
          },
        ],
        format: 'pades',
        language: 'es',
      }
    } else {
      const objJsonStr = JSON.stringify(archivoDoc)
      const objJsonB64 = encodeBase64(objJsonStr)
      documento = {
        archivo: [
          {
            base64: `data:application/javascript;base64,${objJsonB64}`,
            name: `${nombreArchivo}.${formato}`,
          },
        ],
        format: 'jws',
        language: 'es',
      }
    }
    return documento
  }

  const firmarDocumento = async (
    archivo: string | object,
    formato: string,
    nombreArchivo: string
  ) => {
    try {
      const documentoEnviar = crearDocumentoEnviar(archivo, formato, nombreArchivo)
      const respuestaPeticion = await axios({
        method: 'POST',
        url: `${Constantes.firmadorUrl}/sign`,
        data: documentoEnviar,
        withCredentials: false,
        validateStatus(status) {
          return estadosCorrectos.some((estado: number) => status === estado)
        },
      })
      const respuesta = respuestaPeticion.data
        ? respuestaPeticion.data
        : respuestaPeticion
      if (respuesta && respuesta.files) {
        if (Array.isArray(respuesta.files) && respuesta.files.length === 1) {
          imprimir('Firmatic version 0.9.0')
          if (formato === 'pdf') {
            return respuesta.files[0].base64
          } else {
            return decodeBase64(respuesta.files[0].base64)
          }
        } else {
          imprimir('No se recibió ningún documento del firmador.')
          return
        }
      } else if (
        respuesta &&
        /^([A-Za-z0-9+]{4})*([A-Za-z0-9+]{3}=|[A-Za-z0-9+]{2}==)?$/.test(
          respuesta
        )
      ) {
        imprimir('Firmatic version 0.7.0')
        return decodeBase64(respuesta)
      } else {
        imprimir('No se recibió ningún documento del firmador.')
        return
      }
    } catch (error: any) {
      imprimir(`Error al firmar el documento: ${error}`)
      error.message = 'No se puede conectar con el servicio de Firmatic.';
      if (error.response && error.response.data) {
        error.message = `Firmatic: ${error.response.data.message}`;
      }
      throw error
    }
  }

  const obtenerEstado = async () => {
    try {
      const respuesta = await axios({
        method: 'GET',
        url: `${Constantes.firmadorUrl}`,
        timeout: 5000,
        withCredentials: false,
        validateStatus(status) {
          return estadosCorrectos.some((estado: number) => status === estado)
        },
      })
      imprimir('respuesta:', respuesta.status)
      return respuesta.status
    } catch (error: any) {
      imprimir(`Error al consultar el estado del firmador: ${error}`)
      return error.status
    }
  }

  return {
    firmarDocumento,
    obtenerEstado,
  }
}

export default useFirmador
