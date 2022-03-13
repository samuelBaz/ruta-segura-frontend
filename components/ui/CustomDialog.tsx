import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  isOpen: boolean
  handleClose: () => void
  title: string
  subtitle?: string
}

export const CustomDialog: FC<Props> = ({
  isOpen,
  handleClose,
  title,
  subtitle,
  children,
}) => {
  const theme = useTheme()
  let dsm = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      fullScreen={dsm}
      fullWidth={true}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle sx={{ m: 1, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          color={'primary'}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{subtitle}</DialogContentText>
        {children}
      </DialogContent>
    </Dialog>
  )
}
