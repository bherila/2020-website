import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline'
import MailIcon from '@mui/icons-material/Mail'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import React from 'react'

import AccountingHeader from './AccountingHeader'

const drawerWidth = 240

export default function AccountingContainer({
  children,
  sidebar,
}: {
  children: any
  sidebar?: any
}) {
  if (!sidebar || typeof sidebar === 'undefined') {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AccountingHeader isFixed={true} drawerWidth={drawerWidth} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children || 'No content'}
        </Box>
      </Box>
    )
  }
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AccountingHeader isFixed={true} drawerWidth={drawerWidth} />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            open
          >
            <div>
              <Toolbar />
              <Divider />
              <List>
                {['AAPL', 'AMZN', 'BABA', 'BIDU'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      <CheckCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['ET Bertie', 'ET Berty', 'IB Berty'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      <CheckCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>{' '}
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  )
}
