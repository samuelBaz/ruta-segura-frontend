import type { NextPage } from 'next'
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { LayoutUser } from '../components/layouts'
import Icono from '../components/ui/Icono'
import React, { ReactNode } from 'react'
import { ColumnaType, UsuarioCRUDType } from '../types'

const Usuarios: NextPage = () => {
  const usuariosData: UsuarioCRUDType[] = [
    {
      id: 'a3701a6b-af01-534d-a4f3-7811ba0ae9af',
      usuario: 'ADMINISTRADOR-TECNICO',
      ciudadaniaDigital: false,
      correoElectronico: 'agepic-1765251@yopmail.com',
      estado: 'ACTIVO',
      usuarioRol: [
        {
          fechaCreacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioCreacion: '1',
          fechaActualizacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioActualizacion: null,
          id: '77f2d5b9-e372-4fe8-bbea-b972d6fbedcb',
          estado: 'ACTIVO',
          rol: {
            id: 'd5de12df-3cc3-5a58-a742-be24030482d8',
            rol: 'ADMINISTRADOR',
          },
        },
        {
          fechaCreacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioCreacion: '1',
          fechaActualizacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioActualizacion: null,
          id: '918f4825-9a36-4720-9c89-7ed1fba4a136',
          estado: 'ACTIVO',
          rol: {
            id: 'a9d1a5cc-4590-5c67-a0b2-a4b37b862802',
            rol: 'TECNICO',
          },
        },
      ],
      persona: {
        nombres: 'MARIA',
        primerApellido: 'PEREZ',
        segundoApellido: 'PEREZ',
        tipoDocumento: 'CI',
        nroDocumento: '1765251',
        fechaNacimiento: '2002-02-09',
      },
    },
    {
      id: 'd5de12df-3cc3-5a58-a742-be24030482d8',
      usuario: 'ADMINISTRADOR',
      ciudadaniaDigital: false,
      correoElectronico: 'agepic-9270815@yopmail.com',
      estado: 'ACTIVO',
      usuarioRol: [
        {
          fechaCreacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioCreacion: '1',
          fechaActualizacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioActualizacion: null,
          id: '99356d2a-8941-4735-82e5-5c1efe562764',
          estado: 'ACTIVO',
          rol: {
            id: 'd5de12df-3cc3-5a58-a742-be24030482d8',
            rol: 'ADMINISTRADOR',
          },
        },
      ],
      persona: {
        nombres: 'JUAN',
        primerApellido: 'PEREZ',
        segundoApellido: 'PEREZ',
        tipoDocumento: 'CI',
        nroDocumento: '9270815',
        fechaNacimiento: '2002-02-09',
      },
    },
    {
      id: 'a9d1a5cc-4590-5c67-a0b2-a4b37b862802',
      usuario: 'TECNICO',
      ciudadaniaDigital: false,
      correoElectronico: 'agepic-6114767@yopmail.com',
      estado: 'ACTIVO',
      usuarioRol: [
        {
          fechaCreacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioCreacion: '1',
          fechaActualizacion: new Date('2022-03-20T11:02:21.950Z'),
          usuarioActualizacion: null,
          id: '3d049518-d8b6-43b1-85dc-5c04fe2bba10',
          estado: 'ACTIVO',
          rol: {
            id: 'a9d1a5cc-4590-5c67-a0b2-a4b37b862802',
            rol: 'TECNICO',
          },
        },
      ],
      persona: {
        nombres: 'PEDRO',
        primerApellido: 'PEREZ',
        segundoApellido: 'PEREZ',
        tipoDocumento: 'CI',
        nroDocumento: '6114767',
        fechaNacimiento: '2002-02-09',
      },
    },
  ]

  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.only('sm'))
  const xs = useMediaQuery(theme.breakpoints.only('xs'))

  const columnas: Array<ColumnaType> = [
    { campo: 'usuario', nombre: 'Usuario', ordenar: true },
    { campo: 'correo', nombre: 'Correo', ordenar: true },
    { campo: 'estado', nombre: 'Estado', ordenar: true },
    { campo: 'acciones', nombre: 'Acciones', ordenar: false },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = usuariosData.map(
    (usuarioData) => [
      <>{usuarioData.usuario}</>,
      <>{usuarioData.correoElectronico}</>,
      <>{usuarioData.estado}</>,
      <Grid>
        <Tooltip title={'Editar'}>
          <IconButton
            aria-label="close"
            onClick={() => {}}
            color={'primary'}
            sx={{}}
          >
            <Icono>edit</Icono>
          </IconButton>
        </Tooltip>
        <Tooltip title={'Restablecer contraseña'}>
          <IconButton
            aria-label="close"
            onClick={() => {}}
            color={'primary'}
            sx={{}}
          >
            <Icono>vpn_key</Icono>
          </IconButton>
        </Tooltip>
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <Tooltip title={'Agregar'}>
      <IconButton
        aria-label="close"
        onClick={function () {}}
        color={'primary'}
        sx={{}}
      >
        <Icono>add</Icono>
      </IconButton>
    </Tooltip>,
    <Tooltip title={'Buscar'}>
      <IconButton
        aria-label="close"
        onClick={function () {}}
        color={'primary'}
        sx={{}}
      >
        <Icono>search</Icono>
      </IconButton>
    </Tooltip>,
    <Tooltip title={'Actualizar'}>
      <IconButton
        aria-label="close"
        onClick={function () {}}
        color={'primary'}
        sx={{}}
      >
        <Icono>refresh</Icono>
      </IconButton>
    </Tooltip>,
  ]

  return (
    <LayoutUser title={'Usuarios'}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
          Usuarios
        </Typography>
        <Typography variant={'h5'} sx={{ fontWeight: 'bold' }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {acciones.map((accion, index) => (
              <div key={`accion-id-${index}`}>{accion}</div>
            ))}
          </Grid>
        </Typography>
      </Grid>
      <Box height={'30px'} />
      {/*Contenedor de la tabla*/}
      <TableContainer>
        <Table>
          {sm || xs ? (
            <TableHead />
          ) : (
            <TableHead>
              <TableRow>
                {columnas.map((columna, index) => (
                  <TableCell key={`cabecera-id-${index}`}>
                    {columna.nombre}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}

          {sm || xs ? (
            <TableBody>
              {contenidoTabla.map((contenidoFila, index) => (
                <TableRow key={`row-id-${index}`}>
                  <TableCell key={`celda-id-${index}`}>
                    {contenidoFila.map((contenido, indexContenido) => (
                      <Grid
                        key={`Grid-id-${index}-${indexContenido}`}
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography>
                          {columnas[indexContenido].nombre}
                        </Typography>
                        <Typography>{contenido}</Typography>
                      </Grid>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {contenidoTabla.map((contenidoFila, indexContenidoTabla) => (
                <TableRow key={`row-id-${indexContenidoTabla}`}>
                  {contenidoFila.map((contenido, indexContenidoFila) => (
                    <TableCell
                      key={`celda-id-${indexContenidoTabla}-${indexContenidoFila}`}
                    >
                      {contenido}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </LayoutUser>
  )
}
export default Usuarios
