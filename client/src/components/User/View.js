import React from 'react'
import { Grid } from '@material-ui/core'

export default function({ user }) {
  return (
    <Grid container>
      <Grid item xs={4}>name</Grid>
      <Grid item xs={8}>{user.name}</Grid>

      <Grid item xs={4}>email</Grid>
      <Grid item xs={8}>{user.email}</Grid>
    </Grid>
  )
}