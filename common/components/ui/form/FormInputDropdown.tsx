import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import {
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import ClearOutlined from '@mui/icons-material/ClearOutlined'

export interface optionType {
  key: string
  value: string
  label: string
}

type FormInputDropdownProps<T extends FieldValues> = {
  id: string
  name: Path<T>
  control: Control<T, object>
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  disabled?: boolean
  onChange?: (event: SelectChangeEvent) => void
  onClear?: () => void
  bgcolor?: string
  options: optionType[]
}

export const FormInputDropdown = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  disabled,
  onChange,
  options,
  onClear,
  bgcolor,
}: FormInputDropdownProps<T>) => {
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
                '& .MuiSelect-iconOutlined': {
                  display: field.value && onClear ? 'none' : '',
                },
                '&.Mui-focused .MuiIconButton-root': { color: 'primary.main' },
              }}
              size={size}
              error={!!error}
              disabled={disabled}
              onChange={(event) => {
                if (onChange) {
                  onChange(event)
                }
                field.onChange(event)
              }}
              inputRef={field.ref}
              value={field.value}
              endAdornment={
                field.value && onClear ? (
                  <IconButton
                    sx={{ display: field.value ? '' : 'none' }}
                    onClick={() => {
                      if (onClear) {
                        onClear()
                      }
                    }}
                    color={'primary'}
                  >
                    <ClearOutlined />
                  </IconButton>
                ) : undefined
              }
            >
              {generateSelectOptions()}
            </Select>
            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
        defaultValue={'' as PathValue<T, Path<T>>}
        rules={rules}
      />
    </div>
  )
}
