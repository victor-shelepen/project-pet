import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, LibEMContext, removeToken, TOKEN_CHANGED_EVENT } from '../lib';

export default function () {
  const navigate = useNavigate()
  const [vIsAuthenticated, setVIsAuthenticated] = useState(isAuthenticated())
  const [open, setOpen] = useState(false);

  function toggleSlider() {
    setOpen(!open);
  };

  const libEM = useContext(LibEMContext)

  useEffect(() => {
    const listener = (token) => {
      setVIsAuthenticated(!!token)
    }
    libEM.on(TOKEN_CHANGED_EVENT, listener)

    return () => {
      libEM.off(TOKEN_CHANGED_EVENT, listener)
    }
  }, [])

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
          onClick={toggleSlider}
        >
          <MenuIcon />
        </IconButton>
        <Typography>
          Pet project
        </Typography>

        <Drawer open={open} anchor="right" onClose={toggleSlider}>
          <Box component="div">
            <List>
              <ListItem>
                <Button color="inherit" component={Link} to='/'>Home</Button>
              </ListItem>
              <ListItem>
                <Button color="inherit" component={Link} to='/about'>About</Button>
              </ListItem>
              {vIsAuthenticated ? (
                <>
                  <ListItem><Button color="inherit" component={Link} to='/users'>Users</Button></ListItem>
                  <ListItem><Button color="inherit" component={Link} to='/measurement/list'>Measurements</Button></ListItem>
                  <ListItem><Button color="inherit" onClick={logoutClicked}>Logout</Button></ListItem>
                </>
              ) : (
                <>
                  <ListItem><Button color="inherit" component={Link} to='/login'>Login</Button></ListItem>
                  <ListItem><Button color="inherit" component={Link} to='/register'>Register</Button></ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  )
}