import { Box, Grid } from '@mui/material'
import Head from 'next/head'
import React, { FC, useContext } from 'react'

import { NavbarUser } from '../ui'
import Toolbar from '@mui/material/Toolbar'
import { UIContext } from '../../context/ui'

interface Props {
  title?: string
}

export const LayoutUser: FC<Props> = ({
  title = 'Frontend base - NextJS',
  children,
}) => {
  const { sidemenuOpen } = useContext(UIContext)

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      justifyItems={'center'}
    >
      <Box sx={{ display: 'flex' }}>
        <Head>
          <title>{title}</title>
        </Head>
        <NavbarUser />
      </Box>
      <Box
        component="main"
        sx={{
          width: sidemenuOpen ? '78%' : '100%',
          // backgroundColor: 'primary.main',
          display: 'flex',
          flexDirection: 'column',
          ml: sidemenuOpen ? '240px' : '0%',
          transition: 'all 0.1s ease-out !important',
        }}
      >
        <Toolbar />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="initial"
          justifyItems={'center'}
          style={{ minHeight: '80vh' }}
        >
          <div style={{ height: '75vh', width: '90%' }}>
            <Box height={'30px'} />
            {children}
          </div>
        </Grid>
      </Box>
    </Grid>
  )
}
