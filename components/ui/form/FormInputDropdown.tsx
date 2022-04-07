import { Controller } from 'react-hook-form'
import { MenuItem, Select, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface FormInputDropdownProps {
  id: string
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  options: any[]
}

export const FormInputDropdown = ({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  options,
}: FormInputDropdownProps) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            id={id}
            sx={{ width: '100%' }}
            size={size}
            error={!!error}
            onChange={onChange}
            value={value}
          >
            {generateSelectOptions()}
          </Select>
        )}
        rules={rules}
      />
    </div>
  )
}
