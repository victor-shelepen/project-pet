import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'

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
        <Grid item container direction='column'>
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
    </>
  )
}