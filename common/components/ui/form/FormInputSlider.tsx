import React, { useEffect } from 'react'

import { Controller } from 'react-hook-form'
import { Slider, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Variant } from '@mui/material/styles/createTypography'
import { UseFormSetValue } from 'react-hook-form/dist/types/form'

export interface FormInputSliderProps {
  id: string
  name: string
  control: any
  label: string
  setValue: UseFormSetValue<any>
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  labelVariant?: Variant
}

export const FormInputSlider = ({
  id,
  name,
  control,
  setValue,
  label,
  size = 'small',
  rules,
  labelVariant = 'subtitle2',
}: FormInputSliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(0)

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue])

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number)
  }

  return (
    <div>
      <Typography
        variant={labelVariant}
        sx={{ pb: 1, fontWeight: 'fontWeightMedium' }}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={() => (
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
