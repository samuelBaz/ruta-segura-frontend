import React, { useEffect } from 'react'

import { Controller } from 'react-hook-form'
import { Slider, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface FormInputSliderProps {
  id: string
  name: string
  control: any
  label: string
  setValue: any
  size?: 'small' | 'medium'
  rules?: RegisterOptions
}

export const FormInputSlider = ({
  id,
  name,
  control,
  setValue,
  label,
  size = 'small',
  rules,
}: FormInputSliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(0)

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue)
  }, [sliderValue])

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number)
  }

  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Slider
            id={id}
            size={size}
            sx={{ width: '100%' }}
            value={sliderValue}
            onChange={handleChange}
          />
        )}
        rules={rules}
      />
    </div>
  )
}
