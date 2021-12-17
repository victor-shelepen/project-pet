import React, { useState } from 'react'
import { Grid, ButtonGroup, Button } from '@material-ui/core'
import View from './View'
import Form from './Form'

const VIEW_STATE = 'VIEW'
const EDIT_STATE = 'EDIT'

export default function ({ user }) {
  const [ display, setDisplay ] = useState(VIEW_STATE)

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
          { display === EDIT_STATE && <Form user={user}/>}
        </Grid>
      </Grid>
    </>
  )
}