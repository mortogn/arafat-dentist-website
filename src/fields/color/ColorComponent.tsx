'use client'

import React, { useCallback, useEffect, useState, useRef } from 'react'
import { TextFieldClientComponent } from 'payload'
import { FieldDescription, FieldLabel, useField } from '@payloadcms/ui'
import './index.scss'

export const ColorComponent: TextFieldClientComponent = (props) => {
  const { path, field, readOnly } = props

  const fieldPath = path || field.name
  const { value = '#FFFFFF', setValue } = useField<string>({ path: fieldPath })

  // Local state to manage color updates and prevent infinite loops
  const [localColor, setLocalColor] = useState(value)

  // Use ref to track if we need to update from value
  const isFirstRender = useRef(true)

  // Update local state when field value changes from outside
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Only update local state if it's different from the field value
    if (value !== localColor) {
      setLocalColor(value)
    }
  }, [value]) // Only depend on value changes from outside

  // Handle color picker changes
  const handleColorPickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value
      setLocalColor(newColor)
      setValue(newColor)
    },
    [setValue],
  )

  // Handle text input field changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value
      setLocalColor(newColor)
      setValue(newColor)
    },
    [setValue],
  )

  const { label, required, admin } = field

  return (
    <div className="field-type color-field-component">
      <FieldLabel htmlFor={`field-${fieldPath}`} label={label} required={required} />

      <div className="color-picker-wrapper">
        <div
          className="color-preview"
          style={{
            backgroundColor: localColor,
            width: '30px',
            height: '30px',
            borderRadius: '4px',
            border: '1px solid #e2e8f0',
            marginRight: '10px',
          }}
        />
        <input
          type="text"
          id={`field-${fieldPath}`}
          value={localColor}
          onChange={handleInputChange}
          className="color-hex-input"
          placeholder="#FFFFFF"
          disabled={readOnly}
        />

        {!readOnly && (
          <input
            type="color"
            value={localColor}
            onChange={handleColorPickerChange}
            className="color-native-picker"
            disabled={readOnly}
          />
        )}
      </div>

      {admin?.description && <FieldDescription path={fieldPath} description={admin.description} />}
    </div>
  )
}
