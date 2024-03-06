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
  altoImg = 45,
  anchoImg = 45,
  acciones,
}) => {
  return (
    <Card sx={{ borderRadius: '10px', borderWidth: '2px' }}>
      <CardContent sx={{ direction: 'column', '&:last-child': { pb: '16px' } }}>
        <Grid container direction="row" alignItems="center">
          {imagen && (
            <Grid>
              <Avatar
                src={imagen}
                alt={imagen}
                sx={{
                  width: anchoImg,
                  height: altoImg,
                  marginRight: '10px',
                }}
                variant="rounded"
              />
            </Grid>
          )}
          <Grid>
            <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
              {titulo}
            </Typography>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: '10px' }}>
          <Typography variant="caption">{subtitulo}</Typography>
        </Grid>
        <Grid>
          <Typography sx={TypographyDescripcionStyles} variant="subtitle2">
            {descripcion}
          </Typography>
        </Grid>
        {acciones && (
          <Grid container alignItems={'center'} justifyContent="flex-end">
            {acciones}
          </Grid>
        )}
      </CardContent>
    </Card>
  )
}
