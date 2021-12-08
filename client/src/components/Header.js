import React from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import {
  Menu as MenuIcon
} from '@material-ui/icons'
import { Link } from "react-router-dom"

export default function () {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          aria-label="Menu"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" component={Link} to='/'>Home</Button>
        <Button color="inherit" component={Link} to='/users'>Users</Button>
        <Button color="inherit" component={Link} to='/about'>About</Button>
        <Button color="inherit" component={Link} to='/login'>Login</Button>
      </Toolbar>
    </AppBar>
  )
}