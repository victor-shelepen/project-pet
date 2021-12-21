import React from 'react'
import { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'
import { post } from '../../lib'

export default function (props) {
  const [isLoading, setIsLoading] = useState(false)
  const [alerts, setAlerts] = useState()
  const [id, setId] = useState(props.id)
  const [object, setObject] = useState({
    height: 0,
    weight: 0
  })

  function updateObject(key, value) {
    const _object = {
      ...object,
      [key]: value,
    }
    setObject(_object)
  }

  async function submitClicked() {
    setIsLoading(true)
    const response = await post('/api/measurement/add', object)
    setIsLoading(false)
    const { alerts } = response
    setAlerts(alerts)
  }

  return (
    <Grid container justifyContent='center' alignItems='center'>
      <Grid item xs={6} container direction='column'>
        <Grid item>
          { !!alerts && (alerts.map((alert) => (<Alert severity={alert.severity}>{alert.message}</Alert>)))}
        </Grid>
        <Grid item>
          <TextField
            label='Height'
            variant='filled'
            required
            value={object.height}
            onChange={e => updateObject('height', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item>
          <TextField
            label='Weight'
            variant='filled'
            required
            value={object.weight}
            onChange={e => updateObject('weight', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            {JSON.stringify(object)}
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={isLoading}
              color='primary'
              onClick={submitClicked}
              fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
