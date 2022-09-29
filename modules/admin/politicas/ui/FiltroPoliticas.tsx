import { Box, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import {
  FormInputDropdown,
  FormInputText,
} from '../../../../common/components/ui/form'

export interface FiltroType {
  buscar: string
  app: string
}

export interface FiltroModalPoliticasType {
  filtroPolitica: string
  filtroApp: string
  accionCorrecta: (filtros: FiltroType) => void
  accionCerrar: () => void
}

export const FiltroPolitica = ({
  filtroPolitica,
  filtroApp,
  accionCorrecta,
}: FiltroModalPoliticasType) => {
  const { control, watch, setValue } = useForm<FiltroType>({
    defaultValues: {
      buscar: filtroPolitica,
      app: filtroApp,
    },
  })
  const filtroBuscarWatch: string = watch('buscar')
  const filtroAppWatch: string = watch('app')
  const debounced = useDebouncedCallback(
    // function
    (filtros: FiltroType) => {
      accionCorrecta(filtros)
    },
    // delay in ms
    1000
  )
  const actualizacionFiltros = (filtros: FiltroType) => {
    debounced(filtros)
  }
  const lapp: string[] = ['frontend', 'backend']
  return (
    <Box sx={{ pl: 1, pr: 1, pt: 1 }}>
      <Grid container direction="row" spacing={{ xs: 2, sm: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={4}>
          <FormInputText
            id={'buscar'}
            name={'buscar'}
            control={control}
            label={'Filtro'}
            bgcolor={'background.paper'}
            onChange={(event) => {
              actualizacionFiltros({
                buscar: event.target.value,
                app: filtroAppWatch,
              })
            }}
            onClear={() => {
              setValue('buscar', '')
              accionCorrecta({
                buscar: '',
                app: filtroAppWatch,
              })
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <FormInputDropdown
            id={'apps'}
            name="app"
            control={control}
            label="App"
            options={lapp.map((la) => ({
              key: la,
              value: la,
              label: la,
            }))}
            bgcolor={'background.paper'}
            onChange={(event) => {
              actualizacionFiltros({
                buscar: filtroBuscarWatch,
                app: event.target.value,
              })
            }}
            onClear={() => {
              setValue('app', '')
              accionCorrecta({
                buscar: filtroBuscarWatch,
                app: '',
              })
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
