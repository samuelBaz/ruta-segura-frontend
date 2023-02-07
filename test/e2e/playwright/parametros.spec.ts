import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

test('Parámetros - Nuevo parámetro', async ({ page }) => {
  const parametroAleatorio = randomWords({ exactly: 1 }).pop() ?? ''
  await page.goto(`/login`)
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Parámetros', exact: true }).click()
  await page.getByRole('button', { name: 'Agregar parámetro' }).click()
  await page.locator('#codigo').fill(parametroAleatorio)
  await page.locator('#nombre').fill(parametroAleatorio)
  await page.locator('#grupo').fill(parametroAleatorio)
  await page.locator('#descripcion').fill(parametroAleatorio)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page.locator('#parametro').fill(parametroAleatorio)
  expect(page.getByRole('cell', { name: parametroAleatorio })).toBeDefined()
})
