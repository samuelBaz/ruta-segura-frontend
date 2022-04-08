import { Controller } from 'react-hook-form'
import { Box, Chip, MenuItem, Select, Typography } from '@mui/material'
import { FormInputDropdownProps } from './FormInputDropdown'

export const FormInputDropdownMultiple = ({
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
            renderValue={(selecteds: string[]) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selecteds.map((selected) => (
                  <Chip
                    key={selected}
                    label={
                      options.find((option) => option.value == selected)?.label
                    }
                  />
                ))}
              </Box>
            )}
            onChange={field.onChange}
            value={field.value}
            multiple
          >
            {generateSelectOptions()}
          </Select>
        )}
        defaultValue={[]}
        rules={rules}
      />
    </div>
  )
}
