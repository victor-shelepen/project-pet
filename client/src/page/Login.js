import React, { useState } from 'react'
import { TextField, Button, Paper, makeStyles, Grid } from '@material-ui/core'
import LoginIcon from '@material-ui/icons/AccountCircle'
import { post, setToken } from '../lib'
import {
  Alert
} from '@material-ui/lab'
import { useNavigate } from 'react-router-dom'

export default function () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alerts, setAlerts] = useState()

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
    setAlerts(alerts)
  }

  return (
    <>
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item xs={4} container direction='column'>
          <Grid item>
            {!!alerts && (alerts.map((alert, index) => (<Alert key={index} severity={alert.severity}>{alert.message}</Alert>)))}
          </Grid>
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
