import { Stack } from '@mantine/core'
import { Form, Formik, FormikHelpers } from 'formik'
import { ObjectSchema as yupObj, string as yupStr } from 'yup'
import SubmitButton from '@components/Formik/SubmitButton'
import AlertStatus from '@components/Formik/AlertStatus'
import { useNavigate } from 'react-router-dom'
import profile_update, { ProfileUpdateArgs } from '@redux/api/profile_update'
import MyUserInput from '@components/Formik/IUser'

interface Values extends ProfileUpdateArgs {}

function ProfileUpdate() {
  const nav = useNavigate()

  return (
    <Formik
      initialValues={{
        userName: '',
        // picture: '',
      }}
      v
      onSubmit={(
        values: Values,
        { setSubmitting, setErrors, setStatus }: FormikHelpers<Values>
      ) => {
        console.log('anything')
        profile_update(values)
          .then(() => {
            nav(-1)
          })
          .catch((e) => {
            console.error(e)
            e.errors && setErrors(e.errors)
            setStatus({ error: e.message })
          })
          .finally(() => {
            setSubmitting(false)
          })
      }}
      validationSchema={
        new yupObj({
          userName: yupStr(),
          // picture: yupStr().required(),
        })
      }
    >
      <Form>
        <Stack>
          <AlertStatus />

          <MyUserInput formikName="userName" />
          {/* todo: make input to upload picture */}
          {/* <MyPasswordInput required formikName="password" /> */}

          <SubmitButton>Update Profile</SubmitButton>
        </Stack>
      </Form>
    </Formik>
  )
}

export default ProfileUpdate