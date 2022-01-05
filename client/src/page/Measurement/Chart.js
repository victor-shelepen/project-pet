import { Grid, Typography } from '@mui/material'
import * as moment from 'moment'
import React, { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { get } from "../../lib"

const dateFormatter = date => {
  return moment(date).format('L')
};

export default function () {
  const [measurements, setMeasurements] = useState([])

  useEffect(async () => {
    const { measurements } = await get('/api/measurement/list')
    setMeasurements(measurements)
  }, [])

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Measurements chart</Typography>
        </Grid>
        <Grid item>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width='100%' height="100%">
              <LineChart data={measurements}>
                <XAxis dataKey="createdAt" tickFormatter={dateFormatter} />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                <Line type="monotone" dataKey="height" stroke="green" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
