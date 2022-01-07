import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import {ResponsiveContainer, LineChart, Line, YAxis} from 'recharts'

export default function () {
  const [rates, setRates] = useState([])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:9001');
    ws.onopen = async (event) => {
    };
    ws.onmessage = async function (event) {
      const text = await event.data.text()
      const rate = JSON.parse(text)
      rates.unshift(rate)
      if (rates.length > 100) {
        rates.pop()
      }
      setRates([...rates])
    };

    //clean up function
    return () => ws.close()
  }, []);

  return (
    <>
      <Grid container direction='column' spacing={2}>
        <Grid item><Typography variant='h4'>Rates</Typography></Grid>
        <Grid item container>
          <Grid item xs={6}>
            <div style={{height: '400px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rates}>
                <Line type="monotone" dataKey="p" stroke="#8884d8" strokeWidth={2} />
                <YAxis type="number" domain={['auto', 'auto']} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Grid>
        <Grid item xs={6} container direction='column'>
          <Grid item container >
            <Grid item>Price</Grid>
          </Grid>
          {rates.map(r => (
            <Grid item container key={r.t}>
              <Grid item>{r.p}</Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    </>
  )
}