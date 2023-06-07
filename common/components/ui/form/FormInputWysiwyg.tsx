import { FormHelperText, Grid, InputLabel } from '@mui/material'
import { InputProps as StandardInputProps } from '@mui/material/Input/Input'
import { InputBaseProps } from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import { Variant } from '@mui/material/styles/createTypography'
import { InputHTMLAttributes } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import Tiptap from '../TipTap'
// import { InfoTooltip } from '../InfoTooltip'

type FormInputWysiwygProps<T extends FieldValues> = {
  id: string
  name: Path<T>
  control: Control<T, object>
  label: string
  textoAyuda?: string
  size?: 'small' | 'medium'
  type?: InputHTMLAttributes<unknown>['type']
  rules?: RegisterOptions
  disabled?: boolean
  onChange?: StandardInputProps['onChange']
  inputProps?: InputBaseProps['inputProps']
  onEnter?: () => void
  onClear?: () => void
  variant?: 'standard' | 'outlined' | 'filled'
  rows?: number
  multiline?: boolean
  bgcolor?: string
  labelVariant?: Variant
  placeholder?: string
}

export const FormInputWysiwyg = <T extends FieldValues>({
  id,
  name,
  control,
  label,
  rules,
  textoAyuda = '',
  labelVariant = 'subtitle2',
  placeholder = '',
}: FormInputWysiwygProps<T>) => {
  return (
    <div>
      {textoAyuda.length > 0 ? (
        <Grid container direction={'row'} spacing={1} alignItems={'stretch'}>
          <Grid item>
            <InputLabel htmlFor={id}>
              <Typography variant={labelVariant} sx={{ color: 'text.primary' }}>
                {label}
              </Typography>
            </InputLabel>
          </Grid>
          <Grid item>
            {/* <InfoTooltip texto={textoAyuda}></InfoTooltip> */}
          </Grid>
        </Grid>
      ) : (
        <InputLabel htmlFor={id}>
          <Typography variant={labelVariant} sx={{ color: 'text.primary' }}>
            {label}
          </Typography>
        </InputLabel>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Tiptap
              editable
              contenido={field.value}
              placeholder={placeholder}
              onChange={(content: string) => {
                field.onChange(content)
              }}
            ></Tiptap>

            {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          </>
        )}
        rules={{
          pattern: {
            value: /[^-\s]/,
            message: 'Formato incorrecto, no se permite espacios en blanco',
          },
          ...rules,
        }}
        defaultValue={'' as PathValue<T, Path<T>>}
      />
    </div>
  )
}
