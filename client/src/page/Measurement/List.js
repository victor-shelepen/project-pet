import React, { useState, useEffect } from 'react'
import { get } from '../../lib'
import { Button, Grid, Typography, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useConfirm } from '../../components/Prompt'
import useAlerts from '../../hooks/useAlerts'
import LocalMenu from '../../components/LocalMenu'
import { useNavigate } from 'react-router-dom'

export default function () {
  const confirm = useConfirm()
  const pushAlerts = useAlerts()
  const navigate = useNavigate()

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
      <Typography variant='h4'>Measurements</Typography>
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
      <LocalMenu>
        {({ close }) => (
          <div>
            <MenuItem
              onClick={(e) => {
                navigate('/measurement/add')
                close();
              }}
            >
              Add
            </MenuItem>
          </div>
        )}
      </LocalMenu>
    </>
  )
}
