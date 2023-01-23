import {
  Box,
  Breakpoint,
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  PaperProps,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from '@mui/material'
import { BaseSyntheticEvent, FC, forwardRef, PropsWithChildren } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { TransitionProps } from '@mui/material/transitions'

interface Props {
  isOpen: boolean
  handleClose: () => void
  title?: string
  fullScreen?: boolean
  maxWidth?: Breakpoint | undefined
  paperProps?: Partial<PaperProps>
  disableBackdropClick?: boolean
  disableEscapeKeyDown?: boolean
  scroll?: 'body' | 'paper'
  noTitle?: boolean
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TransitionZoom = forwardRef(function Transition(
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
  maxWidth,
  paperProps,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  scroll = 'body',
  noTitle = false,
}) => {
  const theme = useTheme()
  let dsm = useMediaQuery(theme.breakpoints.down('sm'))

  const cerrarDialog = (event: BaseSyntheticEvent, reason: string) => {
    if (disableBackdropClick && reason === 'backdropClick') {
      return false
    }
    if (disableEscapeKeyDown && reason === 'escapeKeyDown') {
      return false
    }
    handleClose()
  }
  return (
    <Dialog
      PaperProps={paperProps}
      fullScreen={fullScreen || dsm}
      fullWidth={true}
      maxWidth={maxWidth}
      open={isOpen}
      TransitionComponent={dsm ? Transition : TransitionZoom}
      onClose={cerrarDialog}
      scroll={scroll}
    >
      {noTitle ? (
        <Box />
      ) : (
        <DialogTitle>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {title ? (
              <Typography sx={{ fontWeight: 'medium', fontSize: 18 }}>
                {title}
              </Typography>
            ) : (
              <Box />
            )}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              color={'primary'}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
      )}

      {children}
    </Dialog>
  )
}
