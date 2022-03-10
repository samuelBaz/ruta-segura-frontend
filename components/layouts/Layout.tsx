import { Box } from '@mui/material'
import Head from 'next/head'
import { FC, useContext } from 'react'
import * as React from 'react'
import { Navbar, Sidebar } from '../ui'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'

import { UIContext } from '../../context/ui'

interface Props {
  title?: string
}

export const Layout: FC<Props> = ({ title = 'Proyecto base', children }) => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)
  console.log(`layout: ${sidemenuOpen}`)
  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>
          {title} {sidemenuOpen + ''}
        </title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
