import * as React from 'react'
import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import { LayoutLogin } from '../components/layouts/LayoutLogin'
import Box from '@mui/material/Box'

const Home: NextPage = () => {
  return (
    <LayoutLogin title={'Proyecto base'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        minHeight={'80vh'}
      >
        <Typography variant={'h4'} component="h1" color={'secundary'}>
          Frontend base con MUI v5 + Next.js con TypeScript
        </Typography>
      </Box>
    </LayoutLogin>
  )
}
export default Home
