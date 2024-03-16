import { Box } from '@mui/material'
import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import Toolbar from '@mui/material/Toolbar'
import { NavbarLogin } from '../../../../../common/components/ui/navbars/NavbarLogin'
import { siteName } from '../../../../../common/utils'

interface Props {
  title?: string
}

export const LayoutTestLogin: FC<PropsWithChildren<Props>> = ({
  title = siteName(),
  children,
}) => {
  return (
    <>
      {
        <Box sx={{ display: 'flex' }}>
          <Head>
            <title>{title}</title>
          </Head>
          <NavbarLogin />
          <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
            <Toolbar />
            {children}
          </Box>
        </Box>
      }
    </>
  )
}
