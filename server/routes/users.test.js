const App = require('../app')
const request = require('supertest')
const url = route => `/api/v1/users${route}`
let reqApp

beforeAll(() => {
  return App.then(app => {
    reqApp = request(app)
  })
})

describe('TEST TO USERS', () => {
  const name = 'William Penagos Test'
  const name2 = 'William Penagos Test 2'
  let userID = ''
  let userID2 = ''

  test('ADD USER TO /api/v1/users', () => {

    return reqApp
      .post(url(''))
      .send({ name: name })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        userID = body.data.id
        expect(body.data).toMatchObject({
          name: name,
          wons: 0,
          losts: 0
        })
      })
  })

  test('ADD USER2 TO /api/v1/users', () => {
    return reqApp
      .post(url(''))
      .send({ name: name2 })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        userID2 = body.data.id
        expect(body.data).toMatchObject({
          name: name2,
          wons: 0,
          losts: 0
        })
      })
  })

  test('FIND USER TO /api/v1/users/:userID', () => {
    return reqApp
      .get(url(`/${userID}`))
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toMatchObject({
          name: name,
          wons: 0,
          losts: 0
        })
      })
  })

  test('FIND TEAM TO /api/v1/users/:name1/:name2', () => {
    return reqApp
      .get(url(`/${name}/${name2}`))
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        const names = body.data.map(user => user.name)
        expect(names).toEqual(
          expect.arrayContaining([name, name2])
        )
      })
  })

  test('REMOVE USER2 TO /api/v1/users/del/:id', () => {
    return reqApp
      .get(url(`/del/${userID2}`))
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toMatchObject({
          name: name2,
          wons: 0,
          losts: 0
        })
      })
  })

  test('REMOVE USER TO /api/v1/users', () => {
    return reqApp
      .get(url(`/del/${userID}`))
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toMatchObject({
          name: name,
          wons: 0,
          losts: 0
        })
      })
  })
})