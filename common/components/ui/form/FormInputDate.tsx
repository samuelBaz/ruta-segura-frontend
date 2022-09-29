import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormHelperText, TextField, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import esMX from 'dayjs/locale/es-mx'
import { validarFechaFormato } from '../../../utils/fechas'

export interface FormDatePickerProps {
  id: string
  name: string
  control: any
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
  format = 'DD/MM/YYYY',
  disabled,
  rules,
}: FormDatePickerProps) => {
  return (
    <div>
      <Typography variant={'subtitle2'} sx={{ fontWeight: 'fontWeightMedium' }}>
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMX}>
            <DatePicker
              onChange={field.onChange}
              value={field.value}
              ref={field.ref}
              mask={'__/__/____'}
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
              if (!validarFechaFormato(val, format)) {
                return 'La fecha no es válida'
              }
            },
          },
        }}
        defaultValue={''}
      />
    </div>
  )
}
