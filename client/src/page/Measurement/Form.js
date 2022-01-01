import { Button, Grid, LinearProgress, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { TextField } from 'formik-mui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import useAlerts from "../../hooks/useAlerts"
import { get, post } from '../../lib'
import * as moment from 'moment'

export default function (props) {
  const pushAlerts = useAlerts()

  const [initialValues, setInitialValues] = useState({
    weight: 0,
    height: 0,
  });

  const [measurement, setMeasurement] = useState(false)

  const validationSchema = yup.object({
    weight: yup.number().min(0).required(),
    height: yup.number().min(0).required(),
  })

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const object = {
      ...values,
      ...measurement
    }
    const { alerts, measurement } = await post('/api/measurement/add', object)
    if (measurement) {
      navigate(`/measurement/edit/${measurement._id}`)
    }
    pushAlerts(alerts)
    setSubmitting(false)
  }

  const navigate = useNavigate()
  let { id } = useParams();

  useEffect(async () => {
    if (id) {
      const { measurement: _measurement } = await get(`/api/measurement/get/${id}`)
      setMeasurement(_measurement)
      setInitialValues(_measurement)
    } else {
      setMeasurement(false)
      setInitialValues({
        weight: 0,
        height: 0,
      })
    }
  }, [id])

  return (
    <>
      <Typography variant="subtitle1">Measurement ({props.type})</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Field
                  component={TextField}
                  name='weight'
                  label='Weight'
                  fullWidth
                />
              </Grid>

              <Grid item>
                <Field
                  component={TextField}
                  name='height'
                  label='Height'
                  fullWidth
                />
              </Grid>

              {measurement && (
                <>
                  <Grid item><b>Created at:</b>{moment(measurement.createdAt).format('LLLL')}</Grid>
                  <Grid item><b>Updated at:</b>{moment(measurement.createdAt).format('LLLL')}</Grid>
                </>
              )}

              <Grid item container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  {isSubmitting && <LinearProgress />}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}
