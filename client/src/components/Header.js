import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'
import {
  Menu as MenuIcon
} from '@material-ui/icons'
import { Link, useNavigate } from "react-router-dom"
import { libEM, removeToken, TOKEN_CHANGED_EVENT } from '../lib';

export default function () {
  const navigate = useNavigate()
  const [ vIsAuthenticated, setVIsAuthenticated] = useState()

  libEM.on(TOKEN_CHANGED_EVENT, (token) => {
    setVIsAuthenticated(!!token)
  })

  function logoutClicked() {
    removeToken()
    navigate('/login')
  }

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
        <Button color="inherit" component={Link} to='/about'>About</Button>

        { vIsAuthenticated ? (
           <>
             <Button color="inherit" component={Link} to='/users'>Users</Button>
             <Button color="inherit" onClick={logoutClicked}>Logout</Button>
           </>
          ) : (
            <>
              <Button color="inherit" component={Link} to='/login'>Login</Button>
            </>
          )}
      </Toolbar>
    </AppBar>
  )
}