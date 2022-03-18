import { Box, Fade } from '@mui/material'
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
  const { isLoading } = useAuth()
  const { sidemenuOpen } = useContext(UIContext)
  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <>
          <Fade in={!isLoading} timeout={0}>
            <Box sx={{ display: 'flex' }}>
              <Head>
                <title>{title}</title>
              </Head>
              <NavbarUser />
            </Box>
          </Fade>
          <Fade in={!isLoading} timeout={200}>
            <Box
              component="main"
              sx={{
                width: sidemenuOpen ? '78%' : '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                ml: sidemenuOpen ? '22%' : '0%',
                transition: 'all 0.1s ease-out !important',
              }}
            >
              <Toolbar />
              {children}
            </Box>
          </Fade>
        </>
      )}
      )
    </>
  )
}
