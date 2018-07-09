const App = require('./app')
const request = require('supertest')
// let AppInit;

describe('Test to Index', () => {

  test('Get url /', () => {
    // assert
    return App.then(app => {
      return request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body.data).toBe('Hello world')
        })
    })
  })
})