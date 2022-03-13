import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'

import { UIContext } from '../../context/ui'
import { useContext } from 'react'
import { imprimir } from '../../utils'
import ThemeSwitcherButton from './ThemeSwitcherButton'

export const NavbarUser = () => {
  const { openSideMenu, sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      style={{ borderBottom: 'thin solid rgba(0, 0, 0, 0.12)', padding: '0' }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color={'primary'}
          onClick={() => {
            if (!sidemenuOpen) {
              openSideMenu()
            } else {
              closeSideMenu()
            }
          }}
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <Typography
          color={'primary'}
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Frontend base
        </Typography>

        <IconButton
          size="large"
          onClick={function () {
            imprimir('Abrir modal con ayuda')
          }}
          color="primary"
        >
          <HelpOutlineOutlinedIcon />
        </IconButton>
        <ThemeSwitcherButton />
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          // onClick={handleMenu}
          onClick={function () {
            imprimir('Abrir menu de cuenta')
          }}
          color="primary"
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          // anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          // open={Boolean(anchorEl)}
          open={false}
          // onClose={handleClose}
        >
          <MenuItem
          // onClick={handleClose}
          >
            Profile
          </MenuItem>
          <MenuItem
          // onClick={handleClose}
          >
            My account
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
