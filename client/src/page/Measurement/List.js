import { Grid, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LocalMenu from '../../components/LocalMenu'
import { useConfirm } from '../../components/Prompt'
import RowMenu from '../../components/RowMenu'
import useAlerts from '../../hooks/useAlerts'
import { get } from '../../lib'

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
            <Grid item xs={6}>
              <RowMenu obj={m}>
                <MenuItem onClick={e => navigate('/measurement/edit/' + m._id)}>Edit</MenuItem>
                <MenuItem onClick={e => deleteClicked(m._id)} >Delete</MenuItem>
              </RowMenu>
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
