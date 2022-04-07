import { Controller } from 'react-hook-form'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface FormInputMultiCheckboxProps {
  id: string
  name: string
  control: any
  label: string
  setValue: any
  options: any[]
  size?: 'small' | 'medium'
  rules?: RegisterOptions
}

export const FormInputMultiCheckbox = ({
  id,
  name,
  control,
  setValue,
  label,
  size = 'small',
  options,
  rules,
}: FormInputMultiCheckboxProps) => {
  const [selectedItems, setSelectedItems] = useState<any>([])

  // we are handling the selection manually here
  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value)
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value)
      setSelectedItems(remaining)
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value])
    }
  }

  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedItems)
  }, [selectedItems])

  return (
    <FormControl size={'small'} variant={'outlined'}>
      <FormLabel component="legend">{label}</FormLabel>
      <div>
        {options.map((option: any) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  control={control}
                  render={({}) => {
                    return (
                      <Checkbox
                        id={id}
                        size={size}
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    )
                  }}
                  rules={rules}
                />
              }
              label={option.label}
              key={option.value}
            />
          )
        })}
      </div>
    </FormControl>
  )
}
