import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { Control } from 'react-hook-form/dist/types/form'

export interface FormInputTextProps {
  id: string
  name: string
  control?: Control<any>
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  onChange?: StandardInputProps['onChange']
}

export const FormInputText = ({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  onChange,
}: FormInputTextProps) => {
  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            id={id}
            sx={{ width: '100%' }}
            size={size}
            error={!!error}
            helperText={error?.message}
            onChange={onChange || field.onChange}
            value={field.value}
          />
        )}
        rules={rules}
      />
    </div>
  )
}
