import * as React from 'react'
import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Layout } from '../components/layouts'

const Home: NextPage = () => {
  return (
    <Layout title={'Proyecto base'}>
      <Typography variant={'h4'} component="h1" color={'primary'}>
        Frontend base con MUI v5 + Next.js con TypeScript
      </Typography>
    </Layout>
  )
}
export default Home
