import { NextPage } from 'next'
import { LayoutUser } from '../../common/components/layouts'
import { Typography } from '@mui/material'
import { siteName } from '../../common/utils'
import Mapa from '../../modules/admin/mapas/mapa'

const puntosAux: Array<Array<string>> = [
  ['-16.5000', '-68.1500'],
  ['-16.5145', '-68.1242'],
  ['-16.5082', '-68.1248'],
  ['-16.5250', '-68.1333'],
  ['-16.5305', '-68.0756'],
  ['-16.5382', '-68.0899'],
  ['-16.4994', '-68.1319'],
  ['-16.5030', '-68.1421'],
  ['-16.4815', '-68.1249'],
  ['-16.5111', '-68.1701'],
]

const punto = ['-16.5000', '-68.1500', 'Punto X']

const puntos1: Array<Array<string>> = [
  ['-16.5000', ' -68.1500'],
  ['-17.7833', '-63.1833'],
  ['-17.3895', '-66.1568'],
  ['-19.0333', '-65.2627'],
  ['-19.5833', '-65.7500'],
  ['-17.9833', '-67.1500'],
  ['-21.5355', '-64.7296'],
  ['-14.8333', '-64.9000'],
  ['-10.9833', '-66.1000'],
  ['-21.9600', '-63.6500'],
]

const Mapas: NextPage = () => {
  return (
    <>
      <LayoutUser title={`Mapas - ${siteName()}`}>
        <Typography variant="h5" fontWeight={'medium'}>
          Mapas
        </Typography>
        <Mapa coordinates={[]} />
      </LayoutUser>
    </>
  )
}
export default Mapas
