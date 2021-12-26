import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { Login as LoginIcon , ExitToApp as LogoutIcon } from '@mui/icons-material';

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