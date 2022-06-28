import { Box, Grid } from '@mui/material'
import { FormInputText } from '../../../../common/components/ui/form'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'

export interface FiltroType {
  parametro: string
}

export interface FiltroParametrosType {
  filtroParametro: string
  accionCorrecta: (filtros: FiltroType) => void
  accionCerrar: () => void
}

export const FiltroParametros = ({
  filtroParametro,
  accionCorrecta,
}: FiltroParametrosType) => {
  const { control, watch, setValue } = useForm<FiltroType>({
    defaultValues: {
      parametro: filtroParametro,
    },
  })

  const filtroParametroWatch: string = watch('parametro')

  const debounced = useDebouncedCallback((filtros: FiltroType) => {
    accionCorrecta(filtros)
  }, 1000)

  const actualizacionFiltros = (filtros: FiltroType) => {
    debounced(filtros)
  }

  return (
    <Box sx={{ pl: 1, pr: 1, pt: 1 }}>
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={6}>
          <FormInputText
            id={'parametro'}
            name={'parametro'}
            control={control}
            label={'Buscar parámetro'}
            bgcolor={'background.paper'}
            onChange={(event) => {
              actualizacionFiltros({
                parametro: event.target.value,
              })
            }}
            onClear={() => {
              setValue('parametro', '')
              accionCorrecta({
                parametro: '',
              })
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
