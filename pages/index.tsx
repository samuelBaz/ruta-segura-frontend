import * as React from 'react'
import type { NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import ProTip from '../components/ProTip'
import Copyright from '../components/Copyright'
import { Button } from '@mui/material'
import Link from 'next/link'
import Types from '../components/Tipografias'

const Home: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Ejemplo MUI v5 + Next.js con TypeScript
        </Typography>
        <Link href="/about" passHref={true}>
          <Button variant="text" href="/about">
            Go to the about page
          </Button>
        </Link>

        <Types />

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default Home
