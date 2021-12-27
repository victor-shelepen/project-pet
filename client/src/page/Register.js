import React, { useState } from "react";
import { Grid, Button, Box, LinearProgress } from '@mui/material'
import { TextField } from 'formik-mui'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

export default function () {

  const initialValues = {
    name: '',
    email: 'some@email.com',
    password: '',
    confirmPassword: ''
  }

  const validationSchema = yup.object({
    name: yup.string().required('Name is required...'),
    email: yup.string().email('Email required...').required('Required...'),
    password: yup.string().required('Required.'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match').required('Required')
  })

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
    }, 500);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ submitForm, isSubmitting }) => (
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
                {isSubmitting && <LinearProgress />}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
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