import { toast } from 'react-toastify'
import { imprimir } from '../../utils'

class AlertasClass {
  normal(mensaje: string) {
    imprimir(`📣 ${mensaje}`)
    return toast.info(mensaje, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  correcto(mensaje: string) {
    imprimir(`📣 ${mensaje}`)
    return toast.success(mensaje, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  error(mensaje: string) {
    imprimir(`📣 ${mensaje}`)
    return toast.error(mensaje, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  advertencia(mensaje: string) {
    imprimir(`📣 ${mensaje}`)
    return toast.warn(mensaje, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
}

export const Alertas = new AlertasClass()
