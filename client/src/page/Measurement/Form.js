import { Button, Grid, TextField } from '@material-ui/core'
import {
  Alert
} from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { post, get } from '../../lib'
import { useConfirm } from '../../components/Prompt'

export default function (props) {
  const navigate = useNavigate()
  let { id } = useParams();
  console.log('----', props.type)
  const confirm = useConfirm()
  const [isLoading, setIsLoading] = useState(false)
  const [alerts, setAlerts] = useState()
  const [object, setObject] = useState({
    height: 0,
    weight: 0
  })

  useEffect(async () => {
    if (id) {
      const { measurement } = await get(`/api/measurement/get/${id}`)
      setObject(measurement)
    }
  }, [])

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

  async function deleteClicked() {
    const decision = await confirm({
      title: 'Confirmation',
      text: 'Confirm the deletion action.'
    })
    if (decision == 'agree') {
      setIsLoading(true)
      const { alerts } = await get(`/api/measurement/delete/${object._id}`)
      setAlerts(alerts)
      setIsLoading(false)
      navigate('/measurement/list')
    }
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
            {(!!object && !!object._id) && (<Button
              disabled={isLoading}
              color='primary'
              onClick={deleteClicked}
              fullWidth>
              Delete
            </Button>)}
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
