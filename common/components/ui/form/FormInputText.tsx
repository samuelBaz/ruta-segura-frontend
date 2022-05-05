import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { Control } from 'react-hook-form/dist/types/form'
import { FormHelperText, IconButton } from '@mui/material'
import ClearOutlined from '@mui/icons-material/ClearOutlined'

export interface FormInputTextProps {
  id: string
  name: string
  control: Control<any>
  label: string
  size?: 'small' | 'medium'
  rules?: RegisterOptions
  disabled?: boolean
  onChange?: StandardInputProps['onChange']
  onEnter?: () => void
  onClear?: () => void
  variant?: 'standard' | 'outlined' | 'filled'
}

export const FormInputText = ({
  id,
  name,
  control,
  label,
  size = 'small',
  rules,
  disabled,
  onChange,
  onEnter,
  onClear,
  variant,
}: FormInputTextProps) => {
  return (
    <div>
      <Typography>{label}</Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              id={id}
              name={name}
              variant={variant}
              sx={{ width: '100%' }}
              size={size}
              error={!!error}
              onChange={(event) => {
                if (onChange) {
                  onChange(event)
                }
                field.onChange(event)
              }}
              inputRef={field.ref}
              onKeyUp={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  if (onEnter) {
                    onEnter()
                  }
                }
              }}
              value={field.value}
              disabled={disabled}
              InputProps={{
                endAdornment:
                  field.value && onClear ? (
                    <IconButton
                      size="small"
                      color={'primary'}
                      onClick={() => {
                        if (onClear) {
                          onClear()
                        }
                      }}
                    >
                      <ClearOutlined />
                    </IconButton>
                  ) : undefined,
              }}
            />
            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
        defaultValue={''}
        rules={rules}
      />
    </div>
  )
}
