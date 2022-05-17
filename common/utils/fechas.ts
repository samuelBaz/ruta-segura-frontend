import dayjs from 'dayjs'
import { imprimir } from './imprimir'
import moment from 'moment'

export const stringToDate = (fecha: string, formatoInicial: string): Date => {
  return dayjs(fecha, formatoInicial, true).toDate()
}

export const validarFechaFormatoDayJS = (date: string, format: string) => {
  imprimir(`${date} -> ${dayjs(date, format).format(format)}`)
  return dayjs(date, format, true).isValid()
}

export const validarFechaFormatoMoment = (date: string, format: string) => {
  imprimir(`${date} -> ${moment(date, format).format(format)}`)
  // moment.suppressDeprecationWarnings = true
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
  // moment.suppressDeprecationWarnings = true
  return moment(fecha, formatoInicial, true).format(formatoNuevo)
}
