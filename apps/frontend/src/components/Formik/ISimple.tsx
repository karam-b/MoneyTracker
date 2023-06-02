import { Input } from '@mantine/core'
import { Field, FieldProps } from 'formik'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  placeholder: string
  label: string
  description?: string
  required?: boolean
}

function MySimpleInput({
  formikName,
  required,
  placeholder,
  label,
  description
}: Props) {
  return (
    <Field name={formikName}>
      {({ field, meta }: FieldProps) => {
        return (
          <Input.Wrapper
            required={required}
            size="sm"
            label={label}
            description={description}
            error={meta.touched && meta.error}
          >
            <Input size="sm" placeholder={placeholder} {...field} />
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MySimpleInput
