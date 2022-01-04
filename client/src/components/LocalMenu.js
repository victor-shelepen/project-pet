import React, {useState} from 'react'
import {Menu, Fab} from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

export default function ({ children }) {
  const [anchorEl, setAnchorEl] = useState(false);

  const style = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  const [open, setOpen] = useState(false);

  function openClicked(event) {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setAnchorEl(null);
  }

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        style={style}
        onClick={openClicked}
        variant="extended"
      >
        <MenuIcon /> Menu
      </Fab>
      <Menu anchorEl={anchorEl} open={open}>
        {children({ close })}
      </Menu>
    </>
  );
}