import AdapterDateFns from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Controller } from 'react-hook-form'
import DatePicker from '@mui/lab/DatePicker'
import { FormHelperText, TextField, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Control } from 'react-hook-form/dist/types/form'
import dayjs from 'dayjs'

export interface FormDatePickerProps {
  id: string
  name: string
  control: Control<any>
  label: string
  size?: 'small' | 'medium'
  format?: string
  disabled?: boolean
  rules?: RegisterOptions
}

export const FormInputDate = ({
  id,
  name,
  control,
  label,
  size = 'small',
  format = 'YYYY-MM-DD',
  disabled,
  rules,
}: FormDatePickerProps) => {
  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={onChange}
              value={value}
              ref={ref}
              mask={'____-__-__'}
              inputFormat={format}
              disabled={disabled}
              renderInput={(params) => (
                <>
                  <TextField
                    id={id}
                    sx={{ width: '100%' }}
                    size={size}
                    {...params}
                    error={!!error}
                  />
                  {!!error && (
                    <FormHelperText error>{error?.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </LocalizationProvider>
        )}
        rules={{
          ...rules,
          ...{
            validate: (val: string) => {
              if (!dayjs(val, format).isValid()) return 'La fecha no es válida'
            },
          },
        }}
        defaultValue={''}
      />
    </div>
  )
}
