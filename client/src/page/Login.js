import { Button, Grid, LinearProgress } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAlerts from '../hooks/useAlerts';
import { post, setToken } from '../lib';

export default function () {
  const navigate = useNavigate()
  const pushAlerts = useAlerts()

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })

  async function onSubmit(values) {
    const response = await post('/api/login', values)
    const { alerts, token } = response
    if (!!token) {
      setToken(token)
      navigate('/users')
    }

    pushAlerts(alerts)
  }


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({isSubmitting, isValid}) => (
          <Form>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Field
                  component={TextField}
                  name='email'
                  label='Email'
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Field
                  component={TextField}
                  name='password'
                  label='Password'
                  type='password'
                  fullWidth
                />
              </Grid>
              <Grid item>
                {isSubmitting && <LinearProgress />}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={ isSubmitting || !isValid }
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}
