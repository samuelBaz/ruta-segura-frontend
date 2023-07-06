import { Grid, Card, CardHeader, Typography } from '@mui/material'
import { Bitacora, IBitacoraProps } from './Bitacora'

interface IContenedorBitacoraProps {
  titulo: string
  items: IBitacoraProps[]
  scroll?: boolean
  alturaMaxima?: number
  alturaMinima?: number
}

export const ContenedorBitacora = ({
  titulo,
  items = [],
  scroll = false,
  alturaMaxima,
  alturaMinima,
}: IContenedorBitacoraProps) => {
  return (
    <>
      {items?.length > 0 ? (
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Card
              variant="elevation"
              sx={{
                borderRadius: 3,
                py: 0,
                px: 0,
                ...(alturaMaxima ? { maxHeight: alturaMaxima } : {}),
                ...(alturaMinima ? { minHeight: alturaMinima } : {}),
                overflowY: scroll ? 'auto' : '',
              }}
            >
              <CardHeader
                subheader={titulo}
                sx={{ pb: 0, textAlign: 'center' }}
              />
              {items?.map((accion, index) => (
                <Bitacora
                  key={`dashboard-accion-${index}`}
                  titulo={accion.titulo}
                  items={accion.items}
                />
              ))}
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography
          textAlign={'center'}
          variant="subtitle1"
          color={'text.secondary'}
        >
          Sin resultados
        </Typography>
      )}
    </>
  )
}
