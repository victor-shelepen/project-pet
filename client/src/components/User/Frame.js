import React, { useState, useCallback } from 'react'
import { Grid, ButtonGroup, Button } from '@mui/material'
import View from './View'
import Form from './Form'

const VIEW_STATE = 'VIEW'
const EDIT_STATE = 'EDIT'

export default function ({ user, changed, deleted, children }) {
  const [ display, setDisplay ] = useState(VIEW_STATE)

  const _changed = useCallback((_user) => {
    changed(_user)
  })

  const _deleted = useCallback((_user) => {
    deleted(_user)
  })

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={() => setDisplay(VIEW_STATE)}>View</Button>
            <Button onClick={() => setDisplay(EDIT_STATE)}>Edit</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          { display === VIEW_STATE && <View user={user}/>}
          { display === EDIT_STATE && <Form
            user={user}
            deleted={_deleted}
            changed={_changed}/>}
        </Grid>
        <Grid item>-{ children }-</Grid>
      </Grid>
    </>
  )
}