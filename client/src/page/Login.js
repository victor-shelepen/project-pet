import React, { useState } from "react"
import { TextField, Button, Paper, makeStyles } from '@material-ui/core'
import LoginIcon from '@material-ui/icons/AccountCircle'

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
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function loginClicked() {
    console.log('Login clicked...', email, password);
  }

  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.paper}>
          <TextField
            label="First Name"
            variant="filled"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />

          <TextField
            label="Password"
            variant="filled"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />

          <Button endIcon={<LoginIcon />} color="primary" onClick={loginClicked} fullWidth>Login</Button>
        </Paper>
      </div>
    </>
  )
}
