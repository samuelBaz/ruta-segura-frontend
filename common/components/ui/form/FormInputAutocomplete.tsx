import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import {
  Autocomplete,
  AutocompleteValue,
  FilterOptionsState,
  FormHelperText,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import React from 'react'
import { Variant } from '@mui/material/styles/createTypography'
import { AutocompleteInputChangeReason } from '@mui/base/useAutocomplete/useAutocomplete'

export interface optionType {
  key: string
  value: string
  label: string
}

type FormInputDropdownAutocompleteProps<T extends FieldValues> = {
  id: string
  name: Path<T>
  control: Control<T, object>
  label: string
  multiple?: boolean
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  disabled?: boolean
  onChange?: (keys: AutocompleteValue<unknown, false, false, false>) => void
  filterOptions?: (
    options: optionType[],
    state: FilterOptionsState<optionType>
  ) => optionType[]
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => void
  clearable?: boolean
  bgcolor?: string
  options: optionType[]
  labelVariant?: Variant
}

export const FormInputAutocomplete = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  multiple,
  size = 'small',
  rules,
  disabled,
  onChange,
  filterOptions,
  onInputChange,
  options,
  bgcolor,
  labelVariant = 'subtitle2',
}: FormInputDropdownAutocompleteProps<T>) => {
  return (
    <>
      <InputLabel htmlFor={id}>
        <Typography
          variant={labelVariant}
          sx={{ pb: 0, fontWeight: 'fontWeightMedium', color: 'text.primary' }}
        >
          {label}
        </Typography>
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Autocomplete
              id={id}
              multiple={multiple}
              freeSolo
              forcePopupIcon={true}
              size={size}
              disabled={disabled}
              value={field.value}
              options={options}
              filterSelectedOptions={true}
              filterOptions={filterOptions}
              onInputChange={onInputChange}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value
              }}
              onChange={(event, newValue) => {
                if (onChange) {
                  onChange(newValue)
                }
                field.onChange(newValue)
              }}
              getOptionLabel={(option) => {
                if (typeof option == 'string') return option
                return option?.label ?? ''
              }}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  inputRef={field.ref}
                  sx={{
                    width: '100%',
                    bgcolor: bgcolor,
                  }}
                />
              )}
            />
            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
        defaultValue={[] as PathValue<T, Path<T>>}
        rules={rules}
      />
    </>
  )
}
