import { defineConfig } from 'cypress'
import * as XLSX from 'xlsx'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        createUsersFromODS({ pth }) {
          const data = JSON.parse(
            JSON.stringify(XLSX.readFile(pth).Sheets['SEGIP'])
          )
          const dataArray = Object.entries(data).map((el) => {
            return {
              id: el[0],
              datos: el[1],
            }
          })
          type DatosSegipODS = {
            ComplementoVisible: string
            NumeroDocumento: string
            Complemento: string
            Nombres: string
            PrimerApellido: string
            SegundoApellido: string
            FechaNacimiento: string
            LugarNacimientoPais: string
            LugarNacimientoDepartamento: string
            LugarNacimientoProvincia: string
            LugarNacimientoLocalidad: string
            Observacion?: string
          }

          let actual = 1
          let indice = 0
          let usuario: DatosSegipODS = {
            ComplementoVisible: '',
            NumeroDocumento: '',
            Complemento: '',
            Nombres: '',
            PrimerApellido: '',
            SegundoApellido: '',
            FechaNacimiento: '',
            LugarNacimientoPais: '',
            LugarNacimientoDepartamento: '',
            LugarNacimientoProvincia: '',
            LugarNacimientoLocalidad: '',
            Observacion: '',
          }
          const keys = [
            'ComplementoVisible',
            'NumeroDocumento',
            'Complemento',
            'Nombres',
            'PrimerApellido',
            'SegundoApellido',
            'FechaNacimiento',
            'LugarNacimientoPais',
            'LugarNacimientoDepartamento',
            'LugarNacimientoProvincia',
            'LugarNacimientoLocalidad',
            'Observacion',
          ]
          const usuarios: DatosSegipODS[] = []
          let tieneApellido = false
          for (const user of dataArray) {
            if (
              +user.id[user.id.length - 1] ===
              (actual + 1 === 10 ? 0 : actual + 1)
            ) {
              if (!tieneApellido) {
                usuario.Observacion = usuario.LugarNacimientoLocalidad
                usuario.LugarNacimientoLocalidad =
                  usuario.LugarNacimientoProvincia
                usuario.LugarNacimientoProvincia =
                  usuario.LugarNacimientoDepartamento
                usuario.LugarNacimientoDepartamento =
                  usuario.LugarNacimientoPais
                ;(usuario.LugarNacimientoPais = usuario.FechaNacimiento),
                  (usuario.FechaNacimiento = usuario.SegundoApellido),
                  (usuario.SegundoApellido = '')
              }
              indice = 0
              actual = actual + 1 === 10 ? 0 : (actual += 1)
              tieneApellido = false
              usuarios.push(usuario)
              usuario = {
                ComplementoVisible: '',
                NumeroDocumento: '',
                Complemento: '',
                Nombres: '',
                PrimerApellido: '',
                SegundoApellido: '',
                FechaNacimiento: '',
                LugarNacimientoPais: '',
                LugarNacimientoDepartamento: '',
                LugarNacimientoProvincia: '',
                LugarNacimientoLocalidad: '',
                Observacion: '',
              }
            }
            if (user.id[0] === 'F') {
              tieneApellido = true
            }
            // @ts-ignore
            usuario[keys[indice]] = user.datos['v']
            // @ts-ignore
            indice += 1
          }
          usuarios.push(usuario)
          usuarios.shift()
          return usuarios
        },
      })
    },
    experimentalSessionAndOrigin: true,
    numTestsKeptInMemory: 0,
    fixturesFolder: 'test/e2e/cypress/fixtures',
    specPattern: 'test/e2e/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/e2e/cypress/support/e2e.ts',
  },
})
