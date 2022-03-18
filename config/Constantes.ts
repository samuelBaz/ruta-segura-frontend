const _baseUrl = {
  test: `http://localhost:3000`,
  development: 'https://proyecto-base.test.gtic.gob.bo/ws/api/',
  production: 'https://your-production-url.com/',
}

export const Constantes = {
  baseUrl: _baseUrl[process.env.NODE_ENV],
}
