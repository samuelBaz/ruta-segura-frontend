import axios, { AxiosError, AxiosRequestHeaders, Method } from 'axios'
import { imprimir } from '../utils'

interface peticionFormatoMetodo {
  url: string
  tipo: Method
  headers: AxiosRequestHeaders
  body?: object
}

interface peticionFormato {
  url: string
  headers: AxiosRequestHeaders
  body?: object
}

const estadosCorrectos: number[] = [200, 201, 202]

class ServiciosClass {
  async peticion({ url, tipo = 'get', headers, body }: peticionFormatoMetodo) {
    try {
      imprimir(
        `enviando 🌍 : ${JSON.stringify(
          body
        )} -> ${tipo} - ${url} - con ${JSON.stringify(headers)}`
      )
      const response = await axios({
        method: tipo,
        url: url,
        headers: headers,
        timeout: 5000,
        data: body,
        validateStatus(status) {
          return estadosCorrectos.some((estado: number) => status === estado)
        },
      })
      imprimir(
        `respuesta 📡 : ${JSON.stringify(
          body
        )} -> ${tipo} - ${url} - con ${JSON.stringify(headers)}`
      )
      return response.data
    } catch (e: AxiosError | any) {
      if (e.code === 'ECONNABORTED') {
        throw new Error('La petición está tardando demasiado')
      } else {
        throw e.response.data
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
