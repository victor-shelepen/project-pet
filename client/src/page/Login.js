import React, { useState } from 'react'
import { TextField, Button, Paper, makeStyles } from '@material-ui/core'
import LoginIcon from '@material-ui/icons/AccountCircle'
import { isAuthenticated, post, setToken } from '../lib'
import {
  Alert
} from '@material-ui/lab'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    'justify-content': 'center',
    'margin-top': '40px'
  },
  paper: {
    width: '300px'
  },
})

export default function () {
  const navigate = useNavigate()
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState()

  async function loginClicked() {
    const url = '/api/login'
    const data = {
      email,
      password
    }
    setIsLoading(true)
    const response = await post(url, data)
    setIsLoading(false)
    const { status, message, token } = response
    if (!!token) {
      setToken(token)
      navigate('/users')
    }
    setAlert({
      severity: !status ? 'error' : 'info',
      message
    })
  }

  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          { !!alert && (<Alert severity={alert.severity}>{alert.message}</Alert>) }

          <TextField
            label='First Name'
            variant='filled'
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label='Password'
            variant='filled'
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            disabled={isLoading}
            endIcon={<LoginIcon />}
            color='primary'
            onClick={loginClicked}
            fullWidth>
              Login
           </Button>
        </Paper>
      </div>
    </>
  )
}
