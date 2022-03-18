import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export const FullScreenLoading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress thickness={5} variant={'indeterminate'} />
    </Box>
  )
}
