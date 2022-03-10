import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import { UIContext } from '../../context/ui'
import { useContext } from 'react'

export const Navbar = () => {
  const { openSideMenu, sidemenuOpen, closeSideMenu } = useContext(UIContext)
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color={'primary'}
          onClick={() => {
            console.log(`valor: ${sidemenuOpen}`)
            if (!sidemenuOpen) {
              openSideMenu()
            } else {
              closeSideMenu()
            }
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>

        <Typography color={'primary'} sx={{ fontWeight: 'bold' }}>
          Frontend base
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
