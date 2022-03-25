import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'

interface customTextFieldType {
  name: string
}

export const CampoNombre: FC<customTextFieldType> = ({ name, children }) => {
  return (
    <Box sx={{ pb: 1 }}>
      <Typography
        color={'text.secondary'}
        sx={{ fontSize: 14, fontWeight: 'bold' }}
      >{`${name}`}</Typography>
      {children}
    </Box>
  )
}
