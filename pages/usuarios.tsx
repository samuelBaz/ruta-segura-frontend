import type { NextPage } from 'next'
import { Grid, IconButton, Tooltip, Typography } from '@mui/material'
import { LayoutUser } from '../components/layouts'
import { Icono, CustomDataTable, IconoTooltip } from '../components/ui/'
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

  const columnas: Array<ColumnaType> = [
    { campo: 'usuario', nombre: 'Usuario', ordenar: true },
    { campo: 'correo', nombre: 'Correo', ordenar: true },
    { campo: 'estado', nombre: 'Estado', ordenar: true },
    { campo: 'acciones', nombre: 'Acciones', ordenar: false },
  ]

  const contenidoTabla: Array<Array<ReactNode>> = usuariosData.map(
    (usuarioData) => [
      <Typography variant={'body2'}>{usuarioData.usuario}</Typography>,
      <Typography variant={'body2'}>
        {usuarioData.correoElectronico}
      </Typography>,
      <Typography>{usuarioData.estado}</Typography>,
      <Grid>
        <IconoTooltip titulo={'Editar'} accion={() => {}} icono={'edit'} />
        <IconoTooltip
          titulo={'Restablecer contraseña'}
          accion={() => {}}
          icono={'vpn_key'}
        />
      </Grid>,
    ]
  )

  const acciones: Array<ReactNode> = [
    <IconoTooltip titulo={'Agregar usuario'} accion={() => {}} icono={'add'} />,
    <IconoTooltip titulo={'Buscar'} accion={() => {}} icono={'search'} />,
    <IconoTooltip titulo={'Actualizar'} accion={() => {}} icono={'refresh'} />,
  ]

  return (
    <LayoutUser title={'Usuarios'}>
      <CustomDataTable
        titulo={'Usuarios'}
        acciones={acciones}
        columnas={columnas}
        contenidoTabla={contenidoTabla}
      />
    </LayoutUser>
  )
}
export default Usuarios
