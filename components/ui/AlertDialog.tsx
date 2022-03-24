import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from '@mui/material'
import React, { FC, ReactNode } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

interface Props {
  isOpen: boolean
  titulo: string
  texto: string
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TransitionZoom = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />
})

export const AlertDialog: FC<Props> = ({ isOpen, titulo, texto, children }) => {
  return (
    <Dialog open={isOpen} TransitionComponent={TransitionZoom}>
      <DialogTitle sx={{ m: 1, p: 2 }}>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>{texto}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  )
}
