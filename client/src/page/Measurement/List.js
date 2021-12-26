import React, { useState, useEffect } from 'react'
import { get } from '../../lib'
import { Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

export default function () {
  const [measurements, setMeasurements] = useState([])

  useEffect(async () => {
    const { measurements } = await get('/api/measurement/list')
    setMeasurements(measurements)
  }, [])
  return (
    <Grid container direction='column'>
      <Grid item container>
        <Grid item xs={3}>Height</Grid>
        <Grid item xs={3}> Weight</Grid>
        <Grid item xs={6}></Grid>
      </Grid>
      {measurements.map(m => (
        <Grid item container key={m._id}>
          <Grid item xs={3}>{m.height}</Grid>
          <Grid item xs={3}>{m.weight}</Grid>
          <Grid item xs={6} container>
            <Button color="inherit" component={Link} to={'/measurement/edit/' + m._id}>Edit</Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
