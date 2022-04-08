import { Controller } from 'react-hook-form'
import { MenuItem, Select, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface optionType {
  key: string
  value: string
  label: string
}

export interface FormInputDropdownProps {
  id: string
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  disabled?: boolean
  options: optionType[]
}

export const FormInputDropdown = ({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  disabled,
  options,
}: FormInputDropdownProps) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.key} value={option.value}>
          {option.label}
        </MenuItem>
      )
    })
  }

  return (
    <div>
      <Typography sx={{ pb: 1 }}>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Select
            id={id}
            sx={{ width: '100%' }}
            size={size}
            error={!!error}
            disabled={disabled}
            onChange={field.onChange}
            value={field.value}
          >
            {generateSelectOptions()}
          </Select>
        )}
        defaultValue={''}
        rules={rules}
      />
    </div>
  )
}
