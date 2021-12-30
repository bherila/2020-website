import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import React from 'react'

const Offset = styled('div')(({ theme }) => (theme.mixins as any).toolbar)

const Header = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Container
            maxWidth="lg"
            sx={{ display: `flex`, justifyContent: `space-between` }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Ben Herila
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  )
}

export default Header
