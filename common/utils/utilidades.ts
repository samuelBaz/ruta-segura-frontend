import dayjs from 'dayjs'

import childProcess from 'child_process'
import { Constantes } from '../../config'
import { imprimir } from './imprimir'
import moment from 'moment'

moment.suppressDeprecationWarnings = true

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString('base64')
}
export const decodeBase64 = (data: string) => {
  return Buffer.from(data, 'base64').toString('ascii')
}

export const titleCase = (word: string) => {
  if (word.length > 1)
    return word
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  else word.toUpperCase()
}

export const execChildProcess = async (comando: string) => {
  const childProcess = require('child_process')
  return await new Promise((resolve, reject) => {
    childProcess.exec(
      comando,
      (error: childProcess.ExecException, stdout: string, stderr: string) => {
        if (error) {
          reject(stderr)
        } else {
          resolve(stdout)
        }
      }
    )
  })
}

export const stringToDate = (fecha: string, formatoInicial: string): Date => {
  return dayjs(fecha, formatoInicial, true).toDate()
}

export const validarFechaFormatoDayJS = (date: string, format: string) => {
  imprimir(`${date} -> ${dayjs(date, format).format(format)}`)
  return dayjs(date, format, true).isValid()
}

export const validarFechaFormatoMoment = (date: string, format: string) => {
  imprimir(`${date} -> ${moment(date, format).format(format)}`)
  return moment(date, format, true).isValid()
}

export const formatoFecha = (
  fecha: string,
  formatoInicial: string,
  formatoNuevo: string
): string => {
  imprimir(
    `${fecha} -> ${moment(fecha, formatoInicial).format(formatoInicial)}`
  )
  return moment(fecha, formatoInicial, true).format(formatoNuevo)
}

export const siteName = () => {
  return Constantes.siteName ?? ''
}
