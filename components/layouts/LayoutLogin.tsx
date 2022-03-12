import { Box } from '@mui/material'
import Head from 'next/head'
import { FC } from 'react'
import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import { NavbarLogin } from '../ui/NavbarLogin'

interface Props {
  title?: string
}

export const LayoutLogin: FC<Props> = ({
  title = 'Frontend base - NextJS',
  children,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>{title}</title>
      </Head>

      <NavbarLogin />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
