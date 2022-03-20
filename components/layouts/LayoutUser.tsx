import { Box, Fade, Grid, useMediaQuery, useTheme } from '@mui/material'
import Head from 'next/head'
import { FC, useContext } from 'react'

import { NavbarUser, Sidebar } from '../ui'
import Toolbar from '@mui/material/Toolbar'
import { useAuth } from '../../context/auth'
import { FullScreenLoading } from '../ui/FullScreenLoading'
import { UIContext } from '../../context/ui'

interface Props {
  title?: string
}

export const LayoutUser: FC<Props> = ({
  title = 'Frontend base - NextJS',
  children,
}) => {
  const { progresoLogin } = useAuth()
  const { sidemenuOpen } = useContext(UIContext)

  const theme = useTheme()
  let usm = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <>
      {progresoLogin ? (
        <FullScreenLoading />
      ) : (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          justifyItems={'center'}
        >
          <Fade in={!progresoLogin} timeout={0}>
            <Box sx={{ display: 'flex' }}>
              <Head>
                <title>{title}</title>
              </Head>
              <NavbarUser />
            </Box>
          </Fade>
          <Fade in={!progresoLogin} timeout={200}>
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
              {children}
            </Box>
          </Fade>
        </Grid>
      )}
    </>
  )
}
