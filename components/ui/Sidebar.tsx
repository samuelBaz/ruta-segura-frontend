import * as React from 'react'
import { useContext, useEffect } from 'react'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { UIContext } from '../../context/ui'
import Toolbar from '@mui/material/Toolbar'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

const drawerWidth = 240

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu, openSideMenu } = useContext(UIContext)
  const theme = useTheme()

  let usm = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    if (!usm) {
      closeSideMenu()
    } else {
      openSideMenu()
    }
    //call your increment function here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usm]) //and in the array tag the state you want to watch for

  return (
    <Drawer
      variant={usm ? 'persistent' : 'temporary'}
      open={sidemenuOpen}
      onClose={closeSideMenu}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: sidemenuOpen ? drawerWidth : `0`,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon color={'primary'} />
                ) : (
                  <MailIcon color={'primary'} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
