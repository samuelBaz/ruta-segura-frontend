import { NextPage } from 'next'
import { LayoutLogin } from '../common/components/layouts'
import { Box, Card } from '@mui/material'
import { siteName } from '../common/utils'
import Grid from '@mui/material/Grid'
import RegistroContainer from '../modules/login/ui/RegistroContainer'

const Registro: NextPage = () => {
  return (
    <LayoutLogin title={siteName()}>
      <Grid container justifyContent="space-evenly" alignItems={'center'}>
        <Grid item xl={4} md={5} xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              color={'primary'}
            >
              <Card sx={{ borderRadius: 4, p: 2, maxWidth: '450px' }}>
                <Box
                  display={'grid'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ borderRadius: 12, paddingX: 2 }}
                >
                  <RegistroContainer />
                </Box>
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </LayoutLogin>
  )
}

export default Registro
