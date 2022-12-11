import { defineConfig } from 'cypress'
import * as XLSX from 'xlsx'
import Excel from 'exceljs'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
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
          const keys = {
            A: 'ComplementoVisible',
            B: 'NumeroDocumento',
            C: 'Complemento',
            D: 'Nombres',
            E: 'PrimerApellido',
            F: 'SegundoApellido',
            G: 'FechaNacimiento',
            H: 'LugarNacimientoPais',
            I: 'LugarNacimientoDepartamento',
            J: 'LugarNacimientoProvincia',
            K: 'LugarNacimientoLocalidad',
            L: 'Observacion',
          }
          const usuarios: DatosSegipODS[] = []
          // let tieneApellido = false
          for (const user of dataArray) {
            if (
              +user.id[user.id.length - 1] ===
              (actual + 1 === 10 ? 0 : actual + 1)
            ) {
              actual = actual + 1 === 10 ? 0 : (actual += 1)
              // tieneApellido = false
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
              // tieneApellido = true
            }
            // @ts-ignore
            usuario[keys[user.id[0]]] = user.datos['v']
          }
          usuarios.push(usuario)
          usuarios.shift()
          return usuarios
        },
        async generateUsers({ pth }): Promise<any[]> {
          const getCellValue = (row: Excel.Row, cellIndex: number) => {
            const cell = row.getCell(cellIndex)

            return cell.value ? cell.value.toString() : ''
          }

          const workbook = new Excel.Workbook()
          const content = await workbook.xlsx.readFile(pth)

          const worksheet = content.worksheets[0]
          const rowStartIndex = 2
          const numberOfRows = worksheet.rowCount - 1

          const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? []

          return rows.map((row) => {
            return {
              ci: getCellValue(row, 1),
              nombre: getCellValue(row, 2),
              apellido_paterno: getCellValue(row, 3),
              apellido_materno: getCellValue(row, 4),
              telefono: getCellValue(row, 5),
              email: getCellValue(row, 6),
            }
          })
        },
      })
    },
    numTestsKeptInMemory: 0,
    fixturesFolder: 'test/e2e/cypress/fixtures',
    specPattern: 'test/e2e/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/e2e/cypress/support/e2e.ts',
  },
})
