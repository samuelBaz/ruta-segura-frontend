import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Zoom,
} from '@mui/material'
import { FC, forwardRef, PropsWithChildren } from 'react'
import { TransitionProps } from '@mui/material/transitions'

interface Props {
  isOpen: boolean
  titulo: string
  texto: string
}

/*const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})*/

const TransitionZoom = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Zoom ref={ref} {...props} />
})

export const AlertDialog: FC<PropsWithChildren<Props>> = ({
  isOpen,
  titulo,
  texto,
  children,
}) => {
  return (
    <Dialog open={isOpen} TransitionComponent={TransitionZoom}>
      <DialogTitle sx={{ m: 1, p: 2 }}>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography component={'span'}>{texto}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>{children}</DialogActions>
    </Dialog>
  )
}
