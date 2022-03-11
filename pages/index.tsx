import * as React from 'react'
import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import { LayoutUser } from '../components/layouts'
import { IconButton } from '@mui/material'
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn'
import { imprimir } from '../utils'

function saludo() {
  imprimir('Hola mundo 🙌')
}

const Home: NextPage = () => {
  return (
    <LayoutUser title={'Proyecto base'}>
      <Typography variant={'h4'} component="h1" color={'primary'}>
        Frontend base con MUI v5 + Next.js con TypeScript
      </Typography>
      <IconButton
        onClick={() => {
          saludo()
        }}
      >
        <AssignmentTurnedIn />
      </IconButton>
    </LayoutUser>
  )
}
export default Home
