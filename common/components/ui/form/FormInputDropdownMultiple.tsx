import { Controller } from 'react-hook-form'
import {
  Box,
  Checkbox,
  Chip,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { optionType } from './FormInputDropdown'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface FormInputDropdownMultipleProps {
  id: string
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  disabled?: boolean
  onChange?: (event: SelectChangeEvent<string[]>) => void
  options: optionType[]
}

export const FormInputDropdownMultiple = ({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  onChange,
  options,
}: FormInputDropdownMultipleProps) => {
  const generateSelectOptions = (value: string[]) => {
    return options.map((option) => {
      return (
        <MenuItem key={option.key} value={option.value}>
          <Checkbox checked={value.indexOf(option.value) >= 0} />
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
          <>
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
                        options.find((option) => option.value == selected)
                          ?.label
                      }
                    />
                  ))}
                </Box>
              )}
              onChange={(event) => {
                if (onChange) {
                  onChange(event)
                }
                field.onChange(event)
              }}
              inputRef={field.ref}
              value={field.value}
              multiple
            >
              {generateSelectOptions(field.value)}
            </Select>

            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
        defaultValue={[]}
        rules={rules}
      />
    </div>
  )
}
