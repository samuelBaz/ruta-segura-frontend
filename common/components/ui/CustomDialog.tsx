import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  useMediaQuery,
  useTheme,
  Zoom,
} from '@mui/material'
import React, { FC, PropsWithChildren } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

interface Props {
  isOpen: boolean
  handleClose: () => void
  title: string
  fullScreen?: boolean
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

export const CustomDialog: FC<PropsWithChildren<Props>> = ({
  isOpen,
  handleClose,
  title,
  children,
  fullScreen = false,
}) => {
  const theme = useTheme()
  let dsm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={fullScreen || dsm}
      fullWidth={true}
      open={isOpen}
      TransitionComponent={dsm ? Transition : TransitionZoom}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{ m: 1, p: 2 }}
        style={{ borderBottom: 'thin solid rgba(0, 0, 0, 0.1)' }}
      >
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          color={'primary'}
          sx={{
            position: 'absolute',
            right: 10,
            top: 17,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
