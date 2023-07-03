import { Meta, StoryFn } from '@storybook/react'
import useFirmador from '../../../../common/hooks/useFirmador'
import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { imprimir } from '../../../../common/utils/imprimir'
import { delay } from '../../../../common/utils'
import { action } from '@storybook/addon-actions'
import { Constantes } from '../../../../config'
import { BackdropVista } from '../../../../common/components/ui/Backdrop'

export default {
  title: 'Organismos/Firmador/Firmador',
  parameters: {
    docs: {
      description: {
        component:
          'Ejemplo de implementación de Firmatic para formatos de tipo JSON y PDF',
      },
    },
  },
} as Meta

const TemplateJson: StoryFn = () => {
  const [cargando, setCargando] = useState<boolean>(false)
  const { obtenerEstado, firmarDocumento } = useFirmador()

  //  Datos a enviar al hook para firmar
  const datosFirmar = {
    archivo: {
      nombres: 'RICARDO',
      documento: '5602708',
      primerApellido: 'AGUILERA',
      segundoApellido: 'JIMENEZ',
    },
    tipo: 'json',
    nombreDocumento: 'JsonFirmado',
  }

  const firmarProcesar = async () => {
    const estadoFirmatic = await obtenerEstado()
    imprimir('estadoFirmatic:', estadoFirmatic)

    if (estadoFirmatic !== 200) {
      imprimir('El Firmatic no se encuentra iniciado')
      handleClick('Error -> El Firmatic no se encuentra iniciado')
      return
    }

    setCargando(true)
    await delay(500)

    try {
      const documentoFirmado = await firmarDocumento(
        datosFirmar.archivo,
        datosFirmar.tipo,
        datosFirmar.nombreDocumento
      )
      imprimir('documentoFirmado:', documentoFirmado)
      handleClick(`Finalizado -> Documento firmado: ${documentoFirmado}`)
    } catch (error) {
      imprimir(`Error al firmar: ${error}`)
      handleClick(`Error -> No se puedo firmar documento`)
    } finally {
      setCargando(false)
    }
  }

  const handleClick = action(``)

  return (
    <>
      <BackdropVista
        color={'inherit'}
        titulo={'Firmando'}
        cargando={cargando}
      />
      <Button
        href={`${Constantes.firmadorUrl}`}
        target="_blank"
        rel="noreferrer"
        sx={{ p: 0 }}
      >
        <Typography
          variant="body2"
          color={'primary'}
          sx={{ textTransform: 'none', fontWeight: '550' }}
        >
          Verificar servicio
        </Typography>
      </Button>
      <Button
        variant={'contained'}
        color={'primary'}
        disabled={cargando}
        onClick={firmarProcesar}
        sx={{ ml: 2 }}
      >
        {`Firmar`}
      </Button>
    </>
  )
}

const TemplatePdf: StoryFn = () => {
  const [cargando, setCargando] = useState<boolean>(false)
  const { obtenerEstado, firmarDocumento } = useFirmador()

  //  Datos a enviar al hook para firmar
  const datosFirmar = {
    archivo:
      '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/ABCOG8/CmVuZHN0cmVhbQplbmRvYmoKNCAwIG9iago8PC9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9UeXBlMAovQmFzZUZvbnQgL0FBQUFBQStBcmlhbE1UCi9FbmNvZGluZyAvSWRlbnRpdHktSAovRGVzY2VuZGFudEZvbnRzIFsxMCAwIFJdCi9Ub1VuaWNvZGUgMTEgMCBSPj4KZW5kb2JqCnhyZWYKMCAxMgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDQyMiAwMDAwMCBuIAowMDAwMDAwMTc1IDAwMDAwIG4gCjAwMDAwMDgxMjQgMDAwMDAgbiAKMDAwMDAwMDIxMiAwMDAwMCBuIAowMDAwMDAwNjMwIDAwMDAwIG4gCjAwMDAwMDA2ODUgMDAwMDAgbiAKMDAwMDAwMDczMiAwMDAwMCBuIAowMDAwMDA3MzY4IDAwMDAwIG4gCjAwMDAwMDc2MDIgMDAwMDAgbiAKMDAwMDAwNzgyOCAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMTIKL1Jvb3QgNyAwIFIKL0luZm8gMSAwIFI+PgpzdGFydHhyZWYKODI2MwolJUVPRgo=',
    tipo: 'pdf',
    nombreDocumento: 'DocumentoPdfFirmado',
  }

  const firmarProcesar = async () => {
    const estadoFirmatic = await obtenerEstado()
    imprimir('estadoFirmatic:', estadoFirmatic)
    if (estadoFirmatic !== 200) {
      imprimir('El Firmatic no se encuentra iniciado')
      handleClick('Error -> El Firmatic no se encuentra iniciado')
      return
    }
    setCargando(true)
    await delay(500)
    try {
      const documentoFirmado = await firmarDocumento(
        datosFirmar.archivo,
        datosFirmar.tipo,
        datosFirmar.nombreDocumento
      )
      imprimir('documentoFirmado:', documentoFirmado)
      handleClick(`Finalizado -> Documento firmado: ${documentoFirmado}`)
    } catch (error) {
      imprimir(`Error al firmar: ${error}`)
      handleClick(`Error -> No se puedo firmar documento`)
    } finally {
      setCargando(false)
    }
  }

  const handleClick = action(``)

  return (
    <>
      <BackdropVista
        color={'inherit'}
        titulo={'Firmando'}
        cargando={cargando}
      />
      <Button
        href={`${Constantes.firmadorUrl}`}
        target="_blank"
        rel="noreferrer"
        sx={{ p: 0 }}
      >
        <Typography
          variant="body2"
          color={'primary'}
          sx={{ textTransform: 'none', fontWeight: '550' }}
        >
          Verificar servicio
        </Typography>
      </Button>
      <Button
        variant={'contained'}
        color={'success'}
        disabled={cargando}
        onClick={firmarProcesar}
        sx={{ ml: 2 }}
      >
        {`Firmar`}
      </Button>
    </>
  )
}

export const FirmarJson = TemplateJson.bind({})
FirmarJson.storyName = 'Ejemplo de firma de JSON'

export const FirmarDocumento = TemplatePdf.bind({})
FirmarDocumento.storyName = 'Ejemplo de firma de PDF'
