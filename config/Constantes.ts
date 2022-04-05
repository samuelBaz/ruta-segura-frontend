const _baseUrl = {
  development: `https://proyecto-base.test.gtic.gob.bo/ws/api/`,
  test: `https://proyecto-base.test.gtic.gob.bo/ws/api/`,
  production: 'https://proyecto-base.test.gtic.gob.bo/ws/api/',
}

export const Constantes = {
  baseUrl: _baseUrl[process.env.NODE_ENV],
}
