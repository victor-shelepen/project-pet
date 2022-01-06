import { Button, Grid, LinearProgress, Typography } from '@mui/material';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { TextField } from 'formik-mui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAlerts from '../hooks/useAlerts';
import { post, setToken } from '../lib';
import Recaptcha from "react-google-recaptcha";

export default function () {
  const navigate = useNavigate()
  const pushAlerts = useAlerts()

  const initialValues = {
    email: '',
    password: '',
    recaptcha: ''
  }

  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    recaptcha: yup.string().nullable(true).required(),
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

      <Typography variant='h4'>Login</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, setFieldValue, setFieldTouched}) => {
          function onChange(value) {
            setFieldValue('recaptcha', value)
            setFieldTouched('recaptcha')
          }


          return (
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
                  <Recaptcha
                    sitekey="6LdbrPQdAAAAAGikk-qc8ohTtPAfZfgFiXHSeNh3"
                    onChange={onChange}
                  />
                  <Typography sx={{color: 'red'}}>
                    <ErrorMessage name='recaptcha' />
                  </Typography>
                </Grid>
                <Grid item>
                  {isSubmitting && <LinearProgress />}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || !isValid}
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}
