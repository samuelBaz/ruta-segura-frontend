import { Grid, Card, CardHeader, Typography } from "@mui/material"
import { Bitacora } from "./Bitacora"
import { IBitacoraProps } from "../../types/bitacoraTypes"

interface IContenedorBitacoraProps {
  titulo: string
  items: IBitacoraProps[]
  scroll?: boolean
  alturaMaxima?: number
}

export const ContenedorBitacora = ({
  titulo,
  items = [],
  scroll = false,
  alturaMaxima
}: IContenedorBitacoraProps) => {
  return (
    <>
      {items?.length > 0 ?
        <Grid xs={12} sm={6} md={4}>
          <Card
            variant='elevation'
            sx={{
              borderRadius: 3,
              py: 0,
              px: 0,
              ...(alturaMaxima ? { maxHeight: alturaMaxima} : {}),
              overflowY: scroll ? 'scroll' : ''
            }}>
            <CardHeader
              subheader={titulo}
              sx={{ pb: 0, textAlign: 'center' }}
            />
            {
              items?.map((accion, index) => (
                <Bitacora
                  key={`dashboard-accion-${index}`}
                  titulo={accion.titulo}
                  items={accion.items}
                />
              ))
            }
          </Card>
        </Grid>
        :
        <Typography
          textAlign={'center'}
          variant="subtitle1"
          color={'GrayText'}
        >
          Sin resultados
        </Typography>
      }
    </>
  )
}