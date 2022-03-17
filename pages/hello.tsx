import type { NextPage } from 'next'
import { Box, Typography } from '@mui/material'
import { Alertas } from '../components/ui'
import { useEffect } from 'react'

function saludo() {
  Alertas.normal('Hola Mundo 🚀')
}

const Hello: NextPage = () => {
  useEffect(() => {
    saludo()
  })

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'100vh'}
      padding={'3vh'}
      color={'primary'}
    >
      <Typography variant={'h4'} component="h1" color={'primary'}>
        Frontend base con MUI v5 + Next.js con TypeScript
      </Typography>
    </Box>
  )
}
export default Hello
