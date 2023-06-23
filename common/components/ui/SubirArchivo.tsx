import { Box, Typography } from '@mui/material'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useThemeContext } from '../../../context/ui/ThemeContext'
import { Icono } from './Icono'

type SubirArchivoProps = {
  name?: string
  multiple?: boolean
  tiposPermitidos?: string
  handleChange: (event: FileList) => void
}

export const SubirArchivo = ({
  name,
  multiple,
  tiposPermitidos = '.png,.jpg,.jpeg,.doc,.pdf,.cvs,.xlsx,.ods,.epub',
  handleChange,
}: SubirArchivoProps) => {
  const { themeMode } = useThemeContext()
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [arrastrar, setArrastrar] = useState<boolean>(false)
  const uploadFile = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    setArrastrar(false)
    // Filtrar archivos por extención en nombre
    const dt = new DataTransfer()
    if (!event.dataTransfer.files) {
      return
    }
    for (let index = 0; index < event.dataTransfer.files['length']; index++) {
      const auxTipoArchivo = event.dataTransfer.files[index].name.split('.')
      if (
        tiposPermitidos
          .split(',')
          .includes(`.${auxTipoArchivo[auxTipoArchivo.length - 1]}`)
      ) {
        dt.items.add(event.dataTransfer.files[index])
        if (!multiple) {
          break
        }
      }
    }

    event.preventDefault()
    event.stopPropagation()
    handleChange(dt.files)
  }

  return (
    <Box mt={1} mb={1}>
      <Box
        onDragEnter={() => {
          setArrastrar(true)
        }}
        onDragLeave={() => {
          setArrastrar(false)
        }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        // onClick={uploadFile}
      >
        {arrastrar ? (
          <Box
            sx={{
              border: '1px dashed',
              borderColor: 'primary.main',
              padding: 4,
              // bgcolor: 'secondary.main',
              background: themeMode === 'light' ? '#EEEEEE' : '#2D2C2B',
              // opacity: 0.2,
              borderRadius: 3,
              // width: "100%",
              cursor: 'move',
            }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Icono>cloud_upload</Icono>

            <Typography
              component={'span'}
              sx={{ paddingRight: 0.5, color: 'secondary.main' }}
            >
              {'Suelta aquí'}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              border: '1px dashed #ABAFB3',
              padding: 4,
              borderRadius: 3,
              bgcolor: 'background.paper',
              // width: "100%",
              // cursor: 'pointer',
              // '&:hover': {
              //   background: themeMode === 'light' ? '#EEEEEE' : '#2D2C2B',
              // },
            }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Icono color="inherit">cloud_upload</Icono>
            <Box onClick={uploadFile} sx={{ cursor: 'pointer' }}>
              <Typography
                component={'span'}
                sx={{ paddingRight: 0.5, color: 'primary.main' }}
              >
                {multiple ? 'Subir varios archivos' : 'Sube un archivo'}
              </Typography>
              <Typography component={'span'} color={'text.secondary'}>
                o arrastra y suelta aquí
              </Typography>
            </Box>
          </Box>
        )}
        <input
          ref={inputFileRef}
          type="file"
          hidden
          accept={tiposPermitidos}
          name={name}
          // onChange={(e) => handleFileSelected(e.target.files)}
          multiple={!!multiple}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.files) {
              handleChange(event.target.files)
            }
          }}
        />
      </Box>
    </Box>
  )
}
