import {
  Autocomplete,
  Checkbox,
  FormHelperText,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { Icono } from '../Icono'
import { optionType } from './FormInputDropdown'
import { Variant } from '@mui/material/styles/createTypography'

export interface FormInputAutocompleteProps {
  id: string
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  disabled?: boolean
  placeholder?: string
  onChange?: (event: SelectChangeEvent<string[]>) => void
  options: optionType[]
  labelVariant?: Variant
}

export const FormInputAutocomplete = ({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  onChange,
  options,
  placeholder = '+ adicionar',
  labelVariant = 'subtitle2',
}: FormInputAutocompleteProps) => {
  const icon = <Icono>check_box_outline_blank</Icono>
  const checkedIcon = <Icono>check_box</Icono>
  const [value, setValue] = useState<optionType[]>([])
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
        control={control}
        render={({ field, fieldState: { error } }) => {
          const auxOptions: optionType[] = []
          if (field.value) {
            field?.value?.map((item: any) => {
              const result = options.find((option) => item == option.value)
              if (result) {
                auxOptions.push(result)
              }
            })
          }
          return (
            <>
              {options.length > 0 ? (
                <Autocomplete
                  id={id}
                  disableCloseOnSelect
                  multiple
                  fullWidth
                  size={size}
                  value={auxOptions}
                  onChange={(event, newValue) => {
                    setValue(newValue) // para recargar el componente con los nuevos datos. // * mejorar mógica
                    if (field.value) {
                      field.value?.splice(0, field.value.length)
                      newValue?.map((item) => {
                        field.value.push(!!item.value ? item.value : item)
                        return !!item.value ? item.value : item
                      })
                    } else {
                      field.value = [newValue[0].value]
                    }
                  }}
                  options={options}
                  renderOption={(props, option, { selected }) => {
                    return (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </li>
                    )
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        width: '100%',
                      }}
                      placeholder={placeholder}
                    />
                  )}
                  defaultValue={[]}
                />
              ) : null}

              {!!error && (
                <FormHelperText error>{error?.message}</FormHelperText>
              )}
            </>
          )
        }}
        defaultValue={[]}
        rules={rules}
      />
    </div>
  )
}
