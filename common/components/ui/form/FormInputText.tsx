import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { Control } from 'react-hook-form/dist/types/form'
import { FormHelperText, IconButton, InputAdornment } from '@mui/material'
import ClearOutlined from '@mui/icons-material/ClearOutlined'
import { Variant } from '@mui/material/styles/createTypography'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

export interface FormInputTextProps {
  id: string
  name: string
  control: Control<any>
  label: string
  size?: 'small' | 'medium'
  type?: 'password' | 'number' | 'search' | string | undefined
  rules?: RegisterOptions
  disabled?: boolean
  onChange?: StandardInputProps['onChange']
  onEnter?: () => void
  onClear?: () => void
  variant?: 'standard' | 'outlined' | 'filled'
  rows?: number
  multiline?: boolean
  bgcolor?: string
  labelVariant?: Variant
}

export const FormInputText = ({
  id,
  name,
  control,
  label,
  size = 'small',
  type,
  rules,
  disabled,
  onChange,
  onEnter,
  onClear,
  variant,
  rows = 1,
  multiline = false,
  bgcolor,
  labelVariant = 'subtitle2',
}: FormInputTextProps) => {
  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

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
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              id={id}
              name={name}
              variant={variant}
              sx={{
                width: '100%',
                bgcolor: bgcolor,
              }}
              size={size}
              error={!!error}
              rows={rows}
              multiline={multiline}
              type={showPassword ? 'text' : type}
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
                  ) : type == 'password' ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
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
