import MyEmailInput from '@components/Formik/IEmail'
import MyPasswordInput from '@components/Formik/IPassword'
import MyUserInput from '@components/Formik/IUser'
import MyCheckbox from '@components/Formik/ICheckbox'
import { Accordion, Alert, Button, Input, Space, Stack } from '@mantine/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import {
  boolean as yupBool,
  ObjectSchema as yupObj,
  string as yupStr,
} from 'yup'
import AlertStatus from '@components/Formik/AlertStatus'
import SubmitButton from '@components/Formik/SubmitButton'

interface Values {
  userName: string
  email: string
  password: string
  repeatPassword: string
  checked: boolean
}

function RegisterEmail() {
  return (
    <Formik
      initialValues={{
        userName: '',
        email: '',
        password: '',
        repeatPassword: '',
        checked: false,
      }}
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        async function submit() {
          const data = await fetch('http://google.com')
          console.log(data)
        }
        submit()
          .then(() => {})
          .catch((e) => setStatus({ error: e.message }))
          .finally(() => setSubmitting(false))
      }}
      validationSchema={
        new yupObj({
          email: yupStr().required(),
          password: yupStr().required(),
          repeatPassword: yupStr().required(),
          checked: yupBool().isTrue(),
        })
      }
      validate={(values) => {
        const errors: any = {}
        if (values.password !== values.repeatPassword) {
          errors.repeatPassword = "passwords don't match"
        }
        return errors
      }}
    >
      <Form>
        <Stack>
          <AlertStatus />
          <MyUserInput formikName='userName' />
          <MyEmailInput required formikName='email' />
          <MyPasswordInput required formikName='password' />
          <MyPasswordInput required formikName='repeatPassword' />

          <MyCheckbox
            formikName='checked'
            label='agree to the terms and conditions'
          />

          <SubmitButton>Sign Up</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default RegisterEmail
