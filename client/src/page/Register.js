import React from "react";
import { Grid, Button, LinearProgress, Typography } from '@mui/material'
import { TextField } from 'formik-mui'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { post } from '../lib'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";
import useAlerts from "../hooks/useAlerts";
import { RECAPTCHA_SITE_KEY } from '../lib';
import Recaptcha from "react-google-recaptcha";

export default function () {
  const navigate = useNavigate()
  const pushAlerts = useAlerts()

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    recaptcha: '',
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required...'),
    email: yup.string().email('Email required...').required('Required...')
      .test('Unique Email', 'Email already in use',
        async function (value) {
          const { valid } = await post('/api/validEmail', { email: value })

          return valid
        }
      ),
    password: yup.string().required('Required.'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Required'),
    recaptcha: yup.string().nullable(true).required()
  })

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true)
    const { success, alerts } = await post('/api/register', values)
    pushAlerts(alerts)
    if (success) {
      navigate('/login')
    }
    setSubmitting(false)
  }

  return (
    <>
      <Typography variant='h4'>User registration</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, setFieldTouched, isValid }) => {

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
                    name='name'
                    label='Name'
                    fullWidth
                  />
                </Grid>

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
                  <Field
                    component={TextField}
                    name='confirmPassword'
                    label='Confirm password'
                    type='password'
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Recaptcha
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={onChange}
                  />
                  <Typography sx={{ color: 'red' }}>
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