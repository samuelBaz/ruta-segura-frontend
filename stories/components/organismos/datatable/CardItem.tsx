import { FC, ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, Grid } from '@mui/material'
interface CardItemProps {
  id?: string
  titulo: string
  subtitulo?: string
  descripcion: string
  imagen?: string
  altoImg?: number
  anchoImg?: number
  acciones?: ReactNode
}

const TypographyDescripcionStyles = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  textOverflow: 'ellipsis',
  textAlign: 'justify',
}
export const CardItem: FC<CardItemProps> = ({
  titulo,
  subtitulo,
  descripcion,
  imagen,
  altoImg = 55,
  anchoImg = 55,
  acciones,
}) => {
  return (
    <Card sx={{ borderRadius: '10px', borderWidth: '2px' }}>
      <CardContent sx={{ direction: 'column' }}>
        <Grid container direction={'row'}>
          <Grid xs={imagen ? 4 : 8}>
            {imagen ? (
              <Avatar
                src={imagen}
                alt={imagen}
                sx={{
                  width: anchoImg,
                  height: altoImg,
                  marginBottom: '5px',
                }}
                variant="rounded"
              >
                {imagen}
              </Avatar>
            ) : (
              <Grid>
                <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
                  {titulo}
                </Typography>
              </Grid>
            )}
          </Grid>
          {acciones && (
            <Grid
              xs={imagen ? 8 : 4}
              container
              alignItems={'center'}
              justifyContent="flex-end"
            >
              {acciones}
            </Grid>
          )}
        </Grid>
        {imagen && (
          <Grid>
            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
              {titulo}
            </Typography>
          </Grid>
        )}
        <Grid>
          <Typography
            sx={{ marginTop: '5px', marginBottom: '5px' }}
            variant="body2"
          >
            {subtitulo}
          </Typography>
        </Grid>
        <Grid>
          <Typography sx={TypographyDescripcionStyles} variant="subtitle2">
            {descripcion}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  )
}
