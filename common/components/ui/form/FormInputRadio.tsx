import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import Typography from '@mui/material/Typography'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import React from 'react'

type FormInputRadioProps<T extends FieldValues> = {
  id: string
  name: Path<T>
  control: Control<T, object>
  label: string
  size?: 'small' | 'medium'
  options: any[]
  rules?: RegisterOptions
  disabled?: boolean
}

export const FormInputRadio = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  options,
  rules,
  disabled,
}: FormInputRadioProps<T>) => (
  <div>
    <Typography
      variant={'subtitle2'}
      sx={{ pb: 1, fontWeight: 'fontWeightMedium' }}
    >
      {label}
    </Typography>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup value={value} onChange={onChange} id={id} name={name}>
          {options.map((singleOption, index) => (
            <FormControlLabel
              key={index}
              disabled={disabled}
              value={singleOption.value}
              label={singleOption.label}
              control={<Radio />}
            />
          ))}
        </RadioGroup>
      )}
      rules={rules}
    />
  </div>
)
