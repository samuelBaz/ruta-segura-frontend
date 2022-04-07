import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface FormInputTextProps {
  id: string
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
}

export const FormInputText = ({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
}: FormInputTextProps) => {
  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            id={id}
            sx={{ width: '100%' }}
            size={size}
            error={!!error}
            helperText={error?.message}
            onChange={onChange}
            value={value}
          />
        )}
        rules={rules}
      />
    </div>
  )
}
