import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
  ResponseType,
} from 'axios'
import { imprimir } from '../utils/imprimir'

export interface peticionFormatoMetodo {
  url: string
  tipo?: Method
  headers?: AxiosRequestHeaders
  body?: object
  params?: any
  responseType?: ResponseType
}

export interface peticionFormato {
  url: string
  headers?: AxiosRequestHeaders
  body?: object
  params?: any
  responseType?: ResponseType
}

export const estadosCorrectos: number[] = [200, 201, 202, 204]
export const estadosSinPermiso: number[] = [401]

class ServiciosClass {
  async peticionHTTP({
    url,
    tipo = 'get',
    headers,
    body,
    params,
    responseType,
  }: peticionFormatoMetodo): Promise<AxiosResponse> {
    return axios({
      method: tipo,
      url: url,
      headers: headers,
      timeout: 5000,
      data: body,
      params: params,
      responseType: responseType,
      withCredentials: true,
      validateStatus(status) {
        return estadosCorrectos.some((estado: number) => status === estado)
      },
    })
  }

  isNetworkError(err: AxiosError | any) {
    return !!err.isAxiosError && !err.response
  }

  async peticion({
    url,
    tipo = 'get',
    headers,
    body,
    params,
    responseType,
  }: peticionFormatoMetodo) {
    try {
      imprimir(`enviando 🌍`, body, tipo, url, headers)
      const response = await this.peticionHTTP({
        url,
        tipo,
        headers,
        body,
        params,
        responseType,
      })
      imprimir('respuesta 📡', body, tipo, url, response)
      return response.data
    } catch (e: AxiosError | any) {
      if (e.code === 'ECONNABORTED') {
        throw new Error('La petición está tardando demasiado')
      } else if (this.isNetworkError(e))
        throw new Error('Error en la conexión 🌎')
      else {
        throw e.response?.data || 'Ocurrio un error desconocido'
      }
    }
  }

  async get({
    url,
    body = {},
    headers = {},
    params,
    responseType,
  }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'get',
      headers,
      body,
      params,
      responseType,
    })
  }

  async post({
    url,
    body,
    headers,
    params,
    responseType,
  }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'post',
      headers,
      body,
      params,
      responseType,
    })
  }

  async put({
    url,
    body,
    headers,
    params,
    responseType,
  }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'put',
      headers,
      body,
      params,
      responseType,
    })
  }

  async patch({
    url,
    body,
    headers,
    params,
    responseType,
  }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'patch',
      headers,
      body,
      params,
      responseType,
    })
  }

  async delete({
    url,
    body,
    headers,
    params,
    responseType,
  }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'delete',
      headers,
      body,
      params,
      responseType,
    })
  }
}

export const Servicios = new ServiciosClass()
