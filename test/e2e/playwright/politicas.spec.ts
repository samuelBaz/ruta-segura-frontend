import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

test('Politicas - Nueva política', async ({ page }) => {
  const politicaAleatoria = randomWords({ exactly: 1 }).pop() ?? ''
  await page.goto(`/login`)
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.getByRole('button', { name: 'Políticas', exact: true }).click()
  await page.getByRole('button', { name: 'Agregar política' }).click()
  await page.locator('#sujeto').click()
  await page.getByRole('option', { name: 'ADMINISTRADOR' }).click()
  await page.locator('#objeto').click()
  await page.locator('#objeto').fill(politicaAleatoria)
  await page.locator('#app').click()
  await page.getByRole('option', { name: 'frontend' }).click()
  await page.locator('#accion').click()
  await page.getByRole('option', { name: 'read' }).click()
  await page.getByRole('option', { name: 'read' }).press('Escape')
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page.locator('#buscar').fill(politicaAleatoria)
  expect(page.getByRole('cell', { name: politicaAleatoria })).toBeDefined()
})
