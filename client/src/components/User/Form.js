import React, { useState } from "react"
import { Grid, TextField, Button } from "@mui/material"

export default function ({ user, changed, deleted }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  function resetClicked(e) {
    setName(user.name)
    setEmail(user.email)
  }

  function saveClicked(e) {
    const _user = {
      ...user,
      name,
      email
    }

    changed(_user)
  }

  function deleteClicked() {
    deleted(user)
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        {name} - {email}
      </Grid>
      <Grid item>
        <TextField
          label='Name'
          variant='filled'
          required
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item>
        <TextField
          label='Email'
          variant='filled'
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid container>
        <Grid item xs={4}>
          <Button
            onClick={resetClicked}
            color='primary'
            fullWidth>
            Reset
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={deleteClicked}
            color='primary'
            fullWidth>
            Delete
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={saveClicked}
            color='primary'
            fullWidth>
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}