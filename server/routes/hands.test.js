const App = require('../app')
const request = require('supertest')

describe('TEST TO HANDS', () => {
  const items = [
    {
      name: 'Paper',
      beatTo: 2,
      id: 1
    },
    {
      name: 'Rock',
      beatTo: 3,
      id: 2
    },
    {
      name: 'Scissors',
      beatTo: 1,
      id: 3
    }
  ]
  test('GET ALL HANDS /api/v1/hands',  () => {
    // assert
    return App.then(app => {
      return request(app)
        .get('/api/v1/hands')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toEqual(items)
        })
    })
  })
})