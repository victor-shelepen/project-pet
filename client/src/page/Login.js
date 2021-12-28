import { Login as LoginIcon } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlerts from '../hooks/useAlerts';
import { post, setToken } from '../lib';

export default function () {
  const navigate = useNavigate()
  const pushAlerts = useAlerts()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function loginClicked() {
    const url = '/api/login'
    const data = {
      email,
      password
    }
    setIsLoading(true)
    const response = await post(url, data)
    setIsLoading(false)
    const { alerts, token } = response
    if (!!token) {
      setToken(token)
      navigate('/users')
    }

    pushAlerts(alerts)
  }

  return (
    <>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={4} container direction='column'>
          <Grid item>
            <TextField
              label='First Name'
              variant='filled'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              type='password'
              label='Password'
              variant='filled'
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              disabled={isLoading}
              endIcon={<LoginIcon />}
              color='primary'
              onClick={loginClicked}
              fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
