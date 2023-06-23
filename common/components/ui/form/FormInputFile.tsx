import {
  Box,
  Card,
  CardActionArea,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { useEffect, useState } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import { Icono, IconoTooltip } from '../../../../common/components/ui'
import { SubirArchivo } from '../SubirArchivo'

export interface ArchivoType {
  nombre: string
  tipo: string
  espacio: number
  imgUrlLocal: string
}

export interface FormInputFileProps<T extends FieldValues> {
  id: string
  index?: number
  name: Path<T>
  control: Control<T, object>
  tiposPermitidos?: string
  limite?: number
  multiple?: boolean
  label: string
  labelVariant?: Variant
}

interface CardFileProps {
  index: number
  nombre: string
  espacio: number
}

const FormInputFile = <T extends FieldValues>({
  id,
  name,
  control,
  limite = 1000,
  multiple = false,
  tiposPermitidos = '.png,.jpg,.jpeg,.doc,.pdf,.cvs,.xlsx,.ods,.epub',
  label,
  labelVariant = 'subtitle2',
}: FormInputFileProps<T>) => {
  const [archivosCargados, setArchivosCargados] = useState<ArchivoType[]>([])
  const { field } = useController({ name, control })

  // para adicionar nuevo archivo a cargar
  const agregarArchivos = (files: FileList) => {
    // setEnviarArchivos(listaArchivos)

    const auxFiles = cantidadLimite(unirFiles(field.value, files))

    field.onChange(auxFiles)
    setArchivosCargados(filesToArray(auxFiles))
  }

  // convertir el objeto Files(e.target.files) a un array
  const filesToArray = (files: FileList): ArchivoType[] => {
    const auxListaArchivos: ArchivoType[] = []
    for (let index = 0; index < files['length']; index++) {
      const { size, type, name } = files[index]
      auxListaArchivos.push({
        nombre: name,
        espacio: size,
        tipo: type,
        imgUrlLocal: URL.createObjectURL(files[index]),
      })
    }
    return auxListaArchivos
  }
  const cantidadLimite = (files: FileList) => {
    const cantidadLimite = multiple ? limite : 1
    const dt = new DataTransfer()
    for (let index = 0; index < files['length']; index++) {
      if (index < cantidadLimite) {
        dt.items.add(files[index])
      } else {
        break
      }
    }

    return dt.files
  }
  // unir dos obejtos Files(e.target.files)
  const unirFiles = (files: FileList, nuevosFiles: FileList) => {
    const dt = new DataTransfer()

    if (!files) {
      return nuevosFiles
    }
    for (let index = 0; index < files['length']; index++) {
      dt.items.add(files[index])
    }
    for (let index = 0; index < nuevosFiles['length']; index++) {
      dt.items.add(nuevosFiles[index])
    }

    return dt.files
  }

  const quitarArchivo = (index: number) => {
    const dt = new DataTransfer()
    const auxLista = archivosCargados.filter((arr, i) => {
      if (i == index) {
        return false
      }
      dt.items.add(field.value[i])
      return true
    })
    field.onChange(dt.files)
    setArchivosCargados(auxLista)
  }

  const CardFile = ({ index, espacio, nombre }: CardFileProps) => (
    <Card
      variant={'outlined'}
      sx={{
        borderRadius: 3,
        height: 75,
        pl: 2,
        pr: 1,
        pt: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Icono fontSize="large">description</Icono>
          <Stack direction={'column'} sx={{ display: 'grid' }}>
            <Typography
              sx={{
                width: '100%',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                WebkitLineClamp: `${1}`,
              }}
              variant="caption"
            >
              {nombre}
            </Typography>
            <Typography variant="caption" color={'text.secondary'}>
              {(espacio / 1000 / 1000).toFixed(2)} Mb
            </Typography>
          </Stack>
        </Stack>
        <IconoTooltip
          id={`id-quitar-archivo-${0}`}
          color="primary"
          titulo={'Quitar archivo'}
          key={`accionQuitarArchivo`}
          accion={() => {
            quitarArchivo(index)
          }}
          icono={'cancel'}
          name={'Quitar Archivo'}
        />
      </Stack>
    </Card>
  )

  useEffect(() => {
    if (field.value) {
      // para cargar archivos existentes
      setArchivosCargados(filesToArray(field.value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box id={id}>
      <InputLabel htmlFor={id}>
        <Typography variant={labelVariant} sx={{ color: 'text.primary' }}>
          {label}
        </Typography>
      </InputLabel>
      {!multiple && archivosCargados.length == 1 ? (
        <Box
          sx={{
            mt: 1,
            mb: 1,
            border: '1px dashed #ABAFB3',
            padding: 2.3,
            borderRadius: 3,
            bgcolor: 'background.paper',
          }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CardFile
            index={0}
            espacio={archivosCargados[0].espacio}
            nombre={archivosCargados[0].nombre}
          />
        </Box>
      ) : (
        <SubirArchivo
          multiple={multiple}
          tiposPermitidos={tiposPermitidos}
          handleChange={(files: FileList) => {
            agregarArchivos(files)
          }}
        ></SubirArchivo>
      )}

      {multiple && (
        <Box>
          <Grid container spacing={1}>
            {archivosCargados.map((item, index) => {
              return (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <CardActionArea sx={{ borderRadius: 3 }}>
                    <CardFile
                      index={index}
                      espacio={item.espacio}
                      nombre={item.nombre}
                    />
                  </CardActionArea>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}
    </Box>
  )
}
export default FormInputFile
