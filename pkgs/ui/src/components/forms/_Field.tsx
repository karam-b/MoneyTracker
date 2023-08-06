import tw, { css } from 'twin.macro'
import React from 'react'
import { Field as FormikField, FormikProps, useField } from 'formik'
import { WithAsChild, WithChildren } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import { createContext, useContext, useMemo } from 'react'
import { capitalCase } from 'change-case'
import { useId } from '@mantine/hooks'
import { X } from 'tabler-icons-react'
import { formMetaInfo } from './_Form'
import { DefinedContext } from '../../utils/definedContext'
import { FieldProps as FormikFieldProps } from 'formik'
// import { useDefinedContext } from '../../utils/definedContext'

export interface FieldProps {
  name: string
  title?: string
  validate?: (value: string) => string | undefined
}

export interface FieldContext extends Omit<FieldProps, 'validate'> {
  id: string
  req: boolean
  title?: string
}

export function useFieldContext<Formik = any>() {
  const meta_ext = FieldMetaExt.use()
  const [props, meta, actions] = useField<Formik>(meta_ext.name)
  return { meta_ext, props, meta, actions }
}

export const FieldMetaExt = new DefinedContext<FieldContext>()

const Field = (p: FieldProps) => (
  <FieldRoot {...p}>
    <div>
      <FieldBase>
        <div tw="flex gap-3 items-center">
          <div tw="flex-1">
            <Label />
            <Input />
          </div>
          <CancelFieldValue />
        </div>
      </FieldBase>
      <FieldError />
      <FieldInfo />
    </div>
  </FieldRoot>
)

export function FieldBasicRoot(
  P: WithAsChild<{
    name: string
    validate?: (value: string) => string | undefined
  }>,
) {
  const Component = P.asChild ? Slot : 'input'
  return (
    <FormikField validate={P.validate}>
      {({ field }: FormikFieldProps) => {
        return <Component {...field} {...P} value={field.value ?? ''} />
      }}
    </FormikField>
  )
}

export function FieldRoot({
  title: _title,
  children,
  validate,
  name,
  ...props
}: WithChildren<FieldProps>) {
  const { required } = formMetaInfo.use()
  const req = useMemo(() => {
    return required.includes(name)
  }, [name])

  const id = useId()

  const title = useMemo(() => {
    if (_title) return _title
    return capitalCase(name)
  }, [_title, name])

  return (
    <FieldMetaExt.Provider
      value={{
        id,
        req,
        name: name,
        title,
        ...props,
      }}
    >
      <FormikField validate={validate} name={name}>
        {() => children}
      </FormikField>
    </FieldMetaExt.Provider>
  )
}

export function FieldError(props: JSX.IntrinsicAttributes) {
  const { meta } = useFieldContext()
  return (
    <div tw="text-red-600 text-sm" {...props}>
      {meta.touched && meta.error}
    </div>
  )
}

export function FieldInfo(props: WithChildren) {
  return <div tw="text-sm text-slate-500/70" {...props} />
}

export function FieldBase(props: WithChildren) {
  const {
    meta_ext: { id },
    props: field,
    meta,
  } = useFieldContext()
  return (
    <div>
      <div
        id={id}
        className={[
          field.value ? 'value' : 'no-value',
          meta.touched && meta.error ? 'error' : 'no-error',
        ].join(' ')}
        tw="hover:cursor-text"
      >
        <label>
          {props.children}
          <div
            tw="min-h-[1px] w-full bg-slate-400/70 transition-[background-color]"
            css={{
              [`#${id}:focus-within &`]: tw`bg-blue-600 outline outline-1 outline-blue-600`,
              [`#${id}.error &`]: tw`bg-red-600 outline outline-1 outline-red-600`,
              [`#${id}:hover &`]: tw`bg-slate-600 cursor-text`,
            }}
          />
        </label>
      </div>
    </div>
  )
}

export function CancelFieldValue() {
  const { meta, actions } = useFieldContext()
  return meta.value ? (
    <div
      tw="cursor-pointer p-2 pr-0 pb-0"
      onClick={() => actions.setValue(undefined)}
    >
      <X size={16} />
    </div>
  ) : null
}

export function Label() {
  const {
    meta_ext: { id, req, title, name: fieldName },
  } = useFieldContext()

  return (
    <div
      css={[
        {
          // eslint-disable-next-line quotes
          ["&[data-required='true']::after"]: css`
            ${tw`text-red-600`};
            content: ' *';
          `,
        },
        tw`cursor-text h-[16px] translate-y-[16px] text-base transition-[transform,font-size] text-gray-500`,
        {
          [`#${id}:focus-within &, #${id}.value &`]: tw`translate-y-0 text-xs `,
          [`#${id}:focus-within &`]: tw`text-blue-600`,
          [`#${id}.error &`]: tw`text-red-600`,
        },
      ]}
      data-required={req}
    >
      {title || capitalCase(fieldName)}
    </div>
  )
}

export function Input(p: WithAsChild) {
  const Component = p.asChild ? Slot : 'input'
  const {
    props,
    meta_ext: { req },
  } = useFieldContext()
  return (
    <Component
      tw="w-full bg-transparent pb-1 focus-visible:outline-none"
      required={req}
      {...props}
      children={p.asChild ? p.children : undefined}
      value={props.value ?? ''}
    />
  )
}

export { Field as FieldEx }
