import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormHelperText, TextField, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Control } from 'react-hook-form/dist/types/form'
// import dayjs from 'dayjs'
// import esMX from 'dayjs/locale/es-mx'
import 'moment/locale/es'
import { validarFechaFormatoMoment } from '../../../utils'

/*const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)*/

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
        render={({
          field: { onChange, value, ref },
          fieldState: { error },
        }) => (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              onChange={onChange}
              value={value}
              ref={ref}
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
              if (!validarFechaFormatoMoment(val, format)) {
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
