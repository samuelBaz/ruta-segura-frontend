/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  CardActionArea,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import Image, { ImageProps } from 'next/legacy/image'
import React, { useState } from 'react'
import { Icono } from './Icono'

interface ImagenProp extends ImageProps {
  // Props adicionales
}

const Imagen: React.FC<ImagenProp> = (props) => {
  const [mostrar, setMostrar] = useState<boolean>(false)

  const cerrarModalImagen = () => {
    setMostrar(false)
  }
  return (
    <>
      <Dialog
        open={mostrar}
        onClose={cerrarModalImagen}
        // maxWidth={'xl'}
        title={'Cerrar'}
      >
        <DialogTitle sx={{ display: 'contents' }}>
          {props.alt && (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              sx={{ p: 0.4, pl: 2 }}
            >
              <Typography
                sx={{ fontSize: 12 }}
                variant="caption"
                color={'text.secondary'}
              >
                {props.alt}
              </Typography>
              <IconButton
                onClick={() => {
                  setMostrar(false)
                }}
                color={'primary'}
              >
                <Icono fontSize="small">close</Icono>
              </IconButton>
            </Stack>
          )}
        </DialogTitle>
        <img src={props.src.toString()} alt={props.alt}></img>
      </Dialog>

      <CardActionArea
        onClick={() => {
          setMostrar(true)
        }}
        sx={{ cursor: 'zoom-in' }}
      >
        <Image {...props} />
      </CardActionArea>
    </>
  )
}

export default Imagen
