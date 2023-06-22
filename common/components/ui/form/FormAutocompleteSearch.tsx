import { Fragment, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, FormHelperText, Grid, Typography } from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { Variant } from '@mui/material/styles/createTypography'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { optionType } from './FormInputDropdown'
import { Icono } from '../Icono'

export interface FormInputAutocompleteSearchProps<T extends FieldValues> {
  id: string
  name: Path<T>
  control: Control<T, object>
  label: string
  placeholder?: string
  size?: 'small' | 'medium'
  type?: 'password' | 'number' | 'search' | string | undefined
  rules?: RegisterOptions
  disabled?: boolean
  defaultValue: optionType
  onSelect: (value: optionType) => void
  onEnter?: () => VoidFunction
  onClear: () => void
  onChange?: StandardInputProps['onChange']
  bgcolor?: string
  loading: boolean
  options: optionType[]
  labelVariant?: Variant
}

export const FormInputAutocompleteSearch = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  placeholder,
  size = 'small',
  rules,
  disabled,
  onSelect,
  defaultValue,
  onClear,
  onChange,
  loading = false,
  options,
  bgcolor,
  labelVariant = 'subtitle2',
}: FormInputAutocompleteSearchProps<T>) => {
  const [open, setOpen] = useState(false)
  const [currentOptions, setCurrentOptions] = useState<optionType[]>([])

  useEffect(() => {
    if (options.length === 0 && defaultValue.key !== '') {
      options.push(defaultValue)
    } else if (!options.some((option) => option.key === defaultValue.key)) {
      options.push(defaultValue)
    }
    setCurrentOptions([...options])
    setOpen(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  useEffect(() => {
    if (!open) {
      setCurrentOptions([])
    }
  }, [open])

  return (
    <div>
      <Typography
        variant={labelVariant}
        sx={{ fontWeight: 'fontWeightMedium' }}
      >
        {label}
      </Typography>
      <Controller
        name={name}
        defaultValue={[] as PathValue<T, Path<T>>}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            id={id}
            sx={{
              width: '100%',
              bgcolor: bgcolor,
            }}
            disabled={disabled}
            open={open}
            onOpen={() => {
              setOpen(true)
            }}
            onClose={() => {
              setOpen(false)
            }}
            size={size}
            noOptionsText={'Sin opciones encontradas'}
            loadingText={'Cargando'}
            options={currentOptions}
            value={defaultValue}
            loading={loading}
            getOptionLabel={(option) => option.label?.toString()}
            isOptionEqualToValue={(option, value) => {
              if (value.key === '') return true
              return option.key === value.key
            }}
            renderInput={(params) => (
              <>
                <TextField
                  {...params}
                  error={!!error}
                  value={field.value}
                  placeholder={placeholder}
                  onChange={(event) => {
                    field.onChange(event.currentTarget.value)
                    if (onChange) onChange(event)
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                    startAdornment: (
                      <Box sx={{ pt: 1, pl: 1 }}>
                        <Icono color="secondary" fontSize="small">
                          search
                        </Icono>
                      </Box>
                    ),
                  }}
                />
                {!!error && (
                  <FormHelperText error>{error?.message}</FormHelperText>
                )}
              </>
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                field.onChange(newValue.value)
                onSelect(newValue)
              } else {
                if (onClear) {
                  onClear()
                }
                setOpen(false)
                field.onChange(undefined)
              }
            }}
          />
        )}
        rules={rules}
      />
    </div>
  )
}
