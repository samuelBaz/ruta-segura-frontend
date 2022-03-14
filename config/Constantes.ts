const _baseUrl = {
  test: `http://localhost:3000`,
  development: 'https://proyecto-base.test.gtic.gob.bo/ws/api/',
  production: 'https://your-production-url.com/',
}

const _randomNumbers = {
  test: 'http://www.randomnumberapi.com/api/v1.0/random',
  development: 'http://www.randomnumberapi.com/api/v1.0/random',
  production: 'http://www.randomnumberapi.com/api/v1.0/random',
}

const _pokeApi = {
  test: 'https://pokeapi.co/api/v2/pokemon/ditto',
  development: 'https://pokeapi.co/api/v2/pokemon/ditto',
  production: 'https://pokeapi.co/api/v2/pokemon/ditto',
}

export const Constantes = {
  baseUrl: _baseUrl[process.env.NODE_ENV],
  randomNumbers: _randomNumbers[process.env.NODE_ENV],
  pokeApi: _pokeApi[process.env.NODE_ENV],
}
