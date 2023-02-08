import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

const politicaAleatoria = randomWords({ exactly: 1, min: 3 }).pop() ?? ''

test('Políticas - crear/editar política', async ({ page }) => {
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
  // await page.getByRole('button', { name: '​', exact: true }).click();
  await page.getByRole('option', { name: 'read' }).click()
  await page.getByRole('option', { name: 'read' }).press('Escape')
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.waitForTimeout(3000)
  await page.getByRole('button').filter({ hasText: 'search' }).click()
  await page.locator('#buscar').fill(politicaAleatoria)

  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Editar' }).click()
  await page.locator('#objeto').click()
  const politicaAleatoria2 = randomWords({ exactly: 1, min: 3 }).pop() ?? ''
  await page.locator('#objeto').fill(politicaAleatoria2)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.waitForTimeout(2000)
  await page.locator('#buscar').fill(politicaAleatoria2)

  expect(page.getByRole('cell', { name: politicaAleatoria2 })).toBeDefined()
})
