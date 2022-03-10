import { useContext } from 'react'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { UIContext } from '../../context/ui'
import Toolbar from '@mui/material/Toolbar'
import * as React from 'react'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { darkTheme } from '../../themes'

const drawerWidth = 240

export const Sidebar = () => {
  const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer
      variant="persistent"
      open={sidemenuOpen}
      onClose={closeSideMenu}
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
