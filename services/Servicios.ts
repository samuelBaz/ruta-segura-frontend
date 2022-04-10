import axios, { AxiosError, AxiosRequestHeaders, Method } from 'axios'
import { imprimir } from '../utils'

export interface peticionFormatoMetodo {
  url: string
  tipo?: Method
  headers?: AxiosRequestHeaders
  body?: object
  params?: any
}

export interface peticionFormato {
  url: string
  headers: AxiosRequestHeaders
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
      validateStatus(status) {
        return estadosCorrectos.some((estado: number) => status === estado)
      },
    })
  }

  isNetworkError(err: AxiosError | any) {
    return !!err.isAxiosError && !err.response
  }

  async peticion({ url, tipo = 'get', headers, body }: peticionFormatoMetodo) {
    try {
      imprimir(
        `enviando 🌍 : ${
          body ? JSON.stringify(body) : '{}'
        } -> ${tipo} - ${url} - con ${JSON.stringify(headers)}`
      )
      const response = await this.peticionHTTP({ url, tipo, headers, body })
      imprimir(
        `respuesta 📡 : ${
          body ? JSON.stringify(body) : '{}'
        } -> ${tipo} - ${url} - con ${JSON.stringify(
          headers
        )} -->> ${JSON.stringify(response)}`
      )
      return response.data
    } catch (e: AxiosError | any) {
      if (this.isNetworkError(e)) throw new Error('Error en la conexión 🌎')
      else if (e.code === 'ECONNABORTED') {
        throw new Error('La petición está tardando demasiado')
      } else {
        throw e.response?.data || 'Ocurrio un error inesperado'
      }
    }
  }

  async get({ url, body = {}, headers = {} }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'get',
      headers,
      body,
    })
  }

  async post({ url, body, headers }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'post',
      headers,
      body,
    })
  }

  async put({ url, body, headers }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'put',
      headers,
      body,
    })
  }

  async patch({ url, body, headers }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'patch',
      headers,
      body,
    })
  }

  async delete({ url, body, headers }: peticionFormato): Promise<any> {
    return await this.peticion({
      url,
      tipo: 'delete',
      headers,
      body,
    })
  }
}

export const Servicios = new ServiciosClass()
