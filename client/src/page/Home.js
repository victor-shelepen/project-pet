import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import LoginIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';

export default function () {
  return (
    <>
      Home page.
      <ButtonGroup variant="contained">
        <Button endIcon={<LoginIcon />} color="primary">
          Login
        </Button>
        <Button startIcon={<LogoutIcon />} color="secondary">
          Logout
        </Button>
      </ButtonGroup>
    </>
  )
}