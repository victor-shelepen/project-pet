import React, { useState } from "react"
import { Grid, TextField } from "@material-ui/core"

export default function ({ user }) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

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

      <Grid>
        <TextField
          label='Email'
          variant='filled'
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  )
}