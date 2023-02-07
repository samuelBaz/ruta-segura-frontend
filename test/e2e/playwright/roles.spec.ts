import { test } from '@playwright/test'

import randomWords from 'random-words'
const rolAleatorio = randomWords({ exactly: 1 }).pop() ?? ''
test('Roles - Nuevo rol', async ({ page }) => {
  await page.goto(`/login`)
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Roles', exact: true }).click()
  await page.getByRole('button', { name: 'Agregar rol' }).click()
  await page.locator('#rol').fill(rolAleatorio)
  await page.locator('#nombre').fill(rolAleatorio)
  await page.getByRole('button', { name: 'Guardar' }).click()

  // const row =  page.locator('tr:has-text("rol20")');
  // const row = page.locator('tr:has-text("rol20")')
  // await page.waitForTimeout(2000)
  // console.log('====== NRO', await row.count())
  // console.log('DATOS DE FILA', await row.innerText())
  // const tableRows: number = await page.locator('//table/tbody/tr').count()
  // console.log('====== NRO v2', tableRows)
  // await page.waitForTimeout(2000)
  // const randomIndex = Math.round(Math.random() * (tableRows - 2)) + 1

  // const rowSel = await page.locator(`//table/tbody/tr[${randomIndex}]`)
  // await page.waitForTimeout(2000)
  // console.log(`DATOS DE FILA RAMDOM ${randomIndex}`, await rowSel.innerText())

  // //   await page.getByRole('button', { name: 'Editar' }).click()
  // await page.waitForTimeout(2000)
  // rowSel.getByRole('button', { name: 'Editar' }).click()
  // console.log('Editando producto')
})
