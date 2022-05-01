import type { NextPage } from 'next'
import { LayoutUser } from '../common/components/layouts'
import { IconButton, Typography } from '@mui/material'
import { imprimir } from '../common/utils'

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
      />
    </LayoutUser>
  )
}
export default Home
