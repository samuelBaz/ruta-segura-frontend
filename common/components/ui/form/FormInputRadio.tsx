import { Controller } from 'react-hook-form'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import Typography from '@mui/material/Typography'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export interface FormInputRadioProps {
  id: string
  name: string
  control: any
  label: string
  size?: 'small' | 'medium'
  options: any[]
  rules?: RegisterOptions
}

export const FormInputRadio = ({
  id,
  name,
  control,
  label,
  options,
  rules,
}: FormInputRadioProps) => (
  <div>
    <Typography>{label}</Typography>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup value={value} onChange={onChange} id={id}>
          {options.map((singleOption, index) => {
            return (
              <FormControlLabel
                key={index}
                value={singleOption.value}
                label={singleOption.label}
                control={<Radio />}
              />
            )
          })}
        </RadioGroup>
      )}
      rules={rules}
    />
  </div>
)
