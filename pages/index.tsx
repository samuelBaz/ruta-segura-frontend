import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Home: NextPage = () => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minHeight={'100vh'}
    >
      <Typography variant={'h4'} component="h1" color={'primary'}>
        Frontend base con MUI v5 + Next.js con TypeScript
      </Typography>
    </Box>
  )
}

export default Home
