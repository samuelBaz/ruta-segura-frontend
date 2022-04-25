const _baseUrl = {
  development: `http://localhost:3000/api`,
  test: `http://localhost:3000/api`,
  production: 'http://localhost:3000/api',
}

export const Constantes = {
  baseUrl: _baseUrl[process.env.NODE_ENV],
}
