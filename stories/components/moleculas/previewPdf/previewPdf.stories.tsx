// import React from 'react'

import { Meta, StoryFn } from '@storybook/react'

import PdfPreview from '../../../../common/components/ui/preview/PdfPreview'
import { TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { ArchivoType } from '../../../../common/components/ui/form/FormInputImage'
export default {
  title: 'Moléculas/VistaPreviaPdf/PDfPreview',
  component: PdfPreview,
  argTypes: {
    accion: {
      type: 'function',
      control: () => {},
    },
  },
  parameters: {
    docs: {
      description: {
        component: `El componente PdfPreview muestra una vista previa de un archivo PDF. Utiliza un elemento iframe para cargar y visualizar el PDF desde una URL local.`,
      },
    },
  },
} as Meta<typeof PdfPreview>

const Template1: StoryFn<typeof PdfPreview> = (args) => {
  const [url, seturl] = useState<string|null>(null)
  const [archive,setArchive]=useState<ArchivoType|null>(null)
  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    seturl(fileUrl);
  };
  useEffect(()=>{
    if(url !=null){
      const newArchivo:ArchivoType={
        espacio:200,
        nombre:'pruebaPdf',
        tipo:'PDF',
        imgUrlLocal:url
      }
      setArchive(newArchivo)
    }

  },[url])
  args.archivo=archive
  return (
    <>
      <TextField type='file' onChange={handleFileChange}>
        Seleccione Pdf ...
      </TextField>
      <PdfPreview {...args} />
    </>
  )
}

export const Default = Template1.bind({})
Default.storyName = 'VistaPreviaPdf'
