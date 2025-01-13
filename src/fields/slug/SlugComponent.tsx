'use client'

import { TextFieldClientProps } from 'payload'
import React, { FC, useCallback, useEffect } from 'react'
import {
  FieldLabel,
  Button,
  useField,
  useFormFields,
  useForm,
  TextInput,
  FieldDescription,
} from '@payloadcms/ui'
import './index.scss'
import { formatSlug } from './formatSlug'

type Props = {
  fieldToUse: string
  checkboxFieldPath: string
} & TextFieldClientProps

export const SlugComponent: FC<Props> = ({
  checkboxFieldPath: checkboxFieldPathFromProps,
  field,
  fieldToUse,
  path,
  readOnly: readOnlyFromProps,
}) => {
  const { label, required, admin } = field

  const { dispatchFields } = useForm()

  const checkboxFieldPath = path.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  const { value, setValue } = useField<string>({ path: path || field.name })

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders
  const checkboxValue = useFormFields(([fields]) => {
    return fields[checkboxFieldPath]?.value as string
  })

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue)
        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    }
  }, [checkboxValue, targetFieldValue, value, setValue])

  const handleLock = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()

      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      })
    },
    [checkboxValue, dispatchFields, checkboxFieldPath],
  )

  const readonly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} required={required} />

        <Button className="lock-btn" buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        path={path || field.name}
        value={value}
        onChange={setValue}
        readOnly={Boolean(readonly)}
      />

      {admin?.description && (
        <FieldDescription path={path || field.name} description={admin?.description} />
      )}
    </div>
  )
}
