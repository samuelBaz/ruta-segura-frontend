import axios, { AxiosError, AxiosRequestHeaders, Method } from 'axios'
import { imprimir } from '../utils/imprimir'

export interface peticionFormatoMetodo {
  url: string
  tipo?: Method
  headers?: AxiosRequestHeaders
  body?: object
  params?: any
}

export interface peticionFormato {
  url: string
  headers?: AxiosRequestHeaders
  body?: object
  params?: any
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
  }: peticionFormatoMetodo) {
    return axios({
      method: tipo,
      url: url,
      headers: headers,
      timeout: 5000,
      data: body,
      params: params,
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
  }: peticionFormatoMetodo) {
    try {
      imprimir(
        `enviando 🌍 : ${
          body ? JSON.stringify(body) : '{}'
        } -> ${tipo} - ${url} - con ${JSON.stringify(headers)}`
      )
      const response = await this.peticionHTTP({
        url,
        tipo,
        headers,
        body,
        params,
      })
      imprimir(
        `respuesta 📡 : ${
          body ? JSON.stringify(body) : '{}'
        } -> ${tipo} - ${url} - con ${JSON.stringify(
          headers
        )} -->> ${JSON.stringify(response)}`
      )
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
  }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'get',
      headers,
      body,
      params,
    })
  }

  async post({ url, body, headers, params }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'post',
      headers,
      body,
      params,
    })
  }

  async put({ url, body, headers, params }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'put',
      headers,
      body,
      params,
    })
  }

  async patch({ url, body, headers, params }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'patch',
      headers,
      body,
      params,
    })
  }

  async delete({ url, body, headers, params }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'delete',
      headers,
      body,
      params,
    })
  }
}

export const Servicios = new ServiciosClass()
