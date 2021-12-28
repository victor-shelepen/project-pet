import React, { useState, useEffect } from 'react'
import { get } from '../../lib'
import { Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useConfirm } from '../../components/Prompt'
import useAlerts from '../../hooks/useAlerts'

export default function () {
  const confirm = useConfirm()
  const pushAlerts = useAlerts()

  const [measurements, setMeasurements] = useState([])

  async function deleteClicked(id) {
    const decision = await confirm({
      title: 'Confirmation',
      text: 'Confirm the deletion action.'
    })
    if (decision == 'agree') {
      const { alerts } = await get(`/api/measurement/delete/${id}`)
      pushAlerts(alerts)
      const measurements = measurements.filter(m => m._id != id)
      setMeasurements(measurements)
    }
  }

  async function updateMeasurements() {
    const { measurements } = await get('/api/measurement/list')
    setMeasurements(measurements)
  }

  useEffect(async () => {
    await updateMeasurements()
  }, [])

  return (
    <>
      <h1>Measurements</h1>
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
              <Button color="inherit" onClick={e => deleteClicked(m._id)}>Delete</Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
