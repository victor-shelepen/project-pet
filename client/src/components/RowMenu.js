import { Menu as MenuIcon } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import React, { useCallback, useState } from 'react';

export default function ({ children }) {
  const [ isOpen, setIsOpen ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const openClicked = useCallback((e) => {
    setAnchorEl(e.currentTarget)
    setIsOpen(true)
  })

  const handleClose = useCallback((e) => {
    setAnchorEl(false)
    setIsOpen(false)
  })

  return (
    <>
      <IconButton onClick={ openClicked }>
        <MenuIcon/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  )
}