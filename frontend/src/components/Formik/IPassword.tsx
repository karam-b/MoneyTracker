import {
  InputWrapper,
  PasswordInput as MantinePasswordInput,
} from '@mantine/core'
import { Field, FieldProps } from 'formik'
import { string } from 'yup'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  placeholder?: string
  label?: string
  description?: string
  required?: boolean
}

function MyPasswordInput({
  formikName,
  required,
  placeholder,
  label,
  description,
}: Props) {
  return (
    <Field name={formikName}>
      {({ field, meta }: FieldProps) => {
        return (
          <InputWrapper
            required={required}
            size='sm'
            label={label || 'Password'}
            description={description}
            error={meta.touched && meta.error}
          >
            <MantinePasswordInput
              size='sm'
              placeholder={placeholder || 'Enter Password'}
              {...field}
            />
          </InputWrapper>
        )
      }}
    </Field>
  )
}

export default MyPasswordInput