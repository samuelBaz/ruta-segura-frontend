import { Box } from '@mui/material'
import Head from 'next/head'
import { FC } from 'react'
import * as React from 'react'
import { NavbarUser, Sidebar } from '../ui'
import Toolbar from '@mui/material/Toolbar'

interface Props {
  title?: string
}

export const LayoutUser: FC<Props> = ({
  title = 'Proyecto base',
  children,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>{title}</title>
      </Head>

      <NavbarUser />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
