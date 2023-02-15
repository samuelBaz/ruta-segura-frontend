import { expect, test } from '@playwright/test'

import randomWords from 'random-words'

test('Módulos - crear/editar módulo', async ({ page }) => {
  // Generando palabra aleatoria
  const moduloAleatorio = randomWords({ exactly: 1, min: 3 }).pop() ?? ''
  // Iniciando sesión
  await page.goto('/login')
  await page.locator('#usuario').fill('ADMINISTRADOR-TECNICO')
  await page.locator('#contrasena').fill('123')
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  // Abriendo ruta de módulos
  await page.getByRole('button', { name: 'Módulos', exact: true }).click()
  await page.locator('#agregarModuloSeccion').click()
  await page.getByRole('menuitem', { name: 'Nuevo módulo' }).click()
  await page.locator('#idModulo').click()
  await page.getByRole('option', { name: 'Configuración' }).click()
  await page.locator('#icono').fill('check')
  await page.locator('#nombre').fill(moduloAleatorio)
  await page.locator('#label').fill(moduloAleatorio)
  await page.locator('#descripcion').fill(moduloAleatorio)
  await page.locator('#url').fill(moduloAleatorio)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.locator('#btnFiltro').click()
  await page.locator('#buscar').click()
  await page.locator('#buscar').fill(moduloAleatorio)

  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Editar' }).click()

  const nombreAleatoria2 = randomWords({ exactly: 1, min: 3 }).pop() ?? ''
  await page.locator('#icono').fill('check')
  await page.locator('#nombre').fill(nombreAleatoria2)
  await page.locator('#label').fill(nombreAleatoria2)
  await page.locator('#descripcion').fill(nombreAleatoria2)
  await page.locator('#url').fill(nombreAleatoria2)
  await page.getByRole('button', { name: 'Guardar' }).click()
  await page.waitForTimeout(2000)
  await page.locator('#buscar').fill(nombreAleatoria2)

  expect(page.getByRole('cell', { name: moduloAleatorio })).toBeDefined()
})
