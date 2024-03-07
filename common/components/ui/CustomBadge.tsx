import { Badge, useTheme } from '@mui/material'

interface BadgeVariantParams {
  content: string
  variante?: string
}

const CustomBadge = ({ content, variante = 'primary' }: BadgeVariantParams) => {
  const { palette } = useTheme()
  const variantesConfig = {
    primary: {
      background: palette.primary.main,
      color: palette.primary.contrastText,
    },
    secondary: {
      background: '#a9a9a9',
      color: palette.primary.contrastText,
    },
    opacity: {
      background: palette.primary.main,
      color: palette.primary.contrastText,
      opacity: 0.7,
    },
    outline: {
      border: '1px solid',
      borderColor: palette.primary.main,
      color: palette.primary.main,
    },
    gradient: {
      backgroundImage: `linear-gradient(to bottom, ${palette.primary.main}, ${palette.info.main})`,
      color: palette.getContrastText(palette.primary.main),
      opacity: 0.7,
    },
    error: {
      background: '#e57373',
      color: '#fff',
    },
    success: {
      background: '#4caf50',
      color: '#fff',
    },
    alert: {
      background: '#ffb74d',
      color: palette.primary.contrastText,
    },
  }
  const configVariante =
    variante && variantesConfig[variante as keyof typeof variantesConfig]
      ? variantesConfig[variante as keyof typeof variantesConfig]
      : variantesConfig['primary']

  return (
    <Badge
      badgeContent={content}
      sx={{
        '& .MuiBadge-badge': {
          fontSize: '10px',
          padding: '11px 6px',
          borderRadius: '60px',
          fontWeight: 'bold',
          ...configVariante,
        },
      }}
    />
  )
}

export default CustomBadge
