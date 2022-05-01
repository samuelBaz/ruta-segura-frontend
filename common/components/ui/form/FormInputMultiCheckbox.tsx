import { Controller } from 'react-hook-form'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { UseFormSetValue } from 'react-hook-form/dist/types/form'

export interface multiOptionType {
  key: string
  value: string
  label: string
}

export interface FormInputMultiCheckboxProps {
  id: string
  name: string
  control: any
  label: string
  setValue: UseFormSetValue<any>
  options: multiOptionType[]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
