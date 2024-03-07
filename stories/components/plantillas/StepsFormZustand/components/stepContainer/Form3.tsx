import { forwardRef, Ref, useImperativeHandle } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@mui/material'
import { FormInputText } from '../../../../../../common/components/ui/form'
import { useFormStepStore } from '../StepsForm-store'

export interface Form3Ref {
  validar: () => Promise<void>
}

interface PropsComponente {
  accionSiguiente: () => Promise<void>
}

interface Form3Type {
  zona: string
  calle: string
  nroDomicilio: string
}

const Form3 = (props: PropsComponente, ref: Ref<unknown | undefined>) => {
  const formData = useFormStepStore((state) => state.formData)
  const setFormData = useFormStepStore((state) => state.setFormData)

  const { control, handleSubmit } = useForm<Form3Type>({
    defaultValues: formData,
  })

  const onSubmit: SubmitHandler<Form3Type> = async (data) => {
    setFormData(data)
    await props.accionSiguiente()
  }

  useImperativeHandle(
    ref,
    (): Form3Ref => ({
      validar: () => {
        return handleSubmit(onSubmit)()
      },
    })
  )

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <FormInputText
        id={'zona'}
        control={control}
        name="zona"
        label="Zona"
        type={'text'}
        rules={{
          required: 'Este campo es requerido',
        }}
      />

      <FormInputText
        id={'calle'}
        control={control}
        name="calle"
        label="Calle"
        type={'text'}
        rules={{
          required: 'Este campo es requerido',
        }}
      />

      <FormInputText
        id={'nroDomicilio'}
        control={control}
        name="nroDomicilio"
        label="Nro. de Domicilio"
        type={'text'}
        rules={{
          required: 'Este campo es requerido',
        }}
      />
    </Box>
  )
}

export default forwardRef(Form3)
