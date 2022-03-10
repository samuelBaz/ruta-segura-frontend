import * as React from 'react'
import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Layout } from '../components/layouts'
import { IconButton } from '@mui/material'
import TouchApp from '@mui/icons-material/TouchApp'
import { imprimir } from '../utils/imprimir'

function saludo() {
  imprimir('Hola mundo 🙌')
}

const Home: NextPage = () => {
  return (
    <Layout title={'Proyecto base'}>
      <Typography variant={'h4'} component="h1" color={'primary'}>
        Frontend base con MUI v5 + Next.js con TypeScript
      </Typography>
      <IconButton
        onClick={() => {
          saludo()
        }}
      >
        <TouchApp />
      </IconButton>
    </Layout>
  )
}
export default Home
