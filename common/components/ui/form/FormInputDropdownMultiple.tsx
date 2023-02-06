import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
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

type FormInputDropdownMultipleProps<T extends FieldValues> = {
  id: string
  name: Path<T>
  control: Control<T, object>
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  disabled?: boolean
  onChange?: (event: SelectChangeEvent<string[]>) => void
  variant?: 'standard' | 'outlined' | 'filled'
  bgcolor?: string
  options: optionType[]
}

export const FormInputDropdownMultiple = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  disabled,
  onChange,
  variant,
  bgcolor,
  options,
}: FormInputDropdownMultipleProps<T>) => {
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
      <Typography
        variant={'subtitle2'}
        sx={{ pb: 1, fontWeight: 'fontWeightMedium' }}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Select
              id={id}
              name={name}
              sx={{
                width: '100%',
                bgcolor: bgcolor,
              }}
              size={size}
              error={!!error}
              variant={variant}
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
              disabled={disabled}
              multiple
            >
              {generateSelectOptions(field.value)}
            </Select>

            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
        defaultValue={[] as PathValue<T, Path<T>>}
        rules={rules}
      />
    </div>
  )
}
