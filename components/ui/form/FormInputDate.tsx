import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Controller } from 'react-hook-form'
import DatePicker from '@mui/lab/DatePicker'
import { TextField, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface FormDatePickerProps {
  id: string
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
}

export const FormInputDate = ({
  id,
  name,
  label,
  size = 'small',
  control,
  rules,
}: FormDatePickerProps) => {
  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref }, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={onChange}
              value={value}
              ref={ref}
              renderInput={(params) => (
                <TextField
                  id={id}
                  sx={{ width: '100%' }}
                  size={size}
                  {...params}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState?.error?.message}
                />
              )}
            />
          </LocalizationProvider>
        )}
        rules={rules}
      />
    </div>
  )
}
