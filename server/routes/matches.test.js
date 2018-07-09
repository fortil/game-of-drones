const App = require('../app')
const request = require('supertest')
const url = route => encodeURI(`/api/v1${route}`)
const USERS = [
  {
    name: 'William Test 1',
    wons: expect.any(Number),
    losts: expect.any(Number)
  },
  {
    name: 'William Test 2',
    wons: expect.any(Number),
    losts: expect.any(Number)
  }
]
let reqApp

beforeAll(async () => {
  const app = await App
  reqApp = request(app)
  const { body: user1 } = await reqApp.post(url('/users'))
    .send({ name: USERS[0].name })
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
  USERS[0] = user1.data

  const { body: user2 } = await reqApp.post(url('/users'))
    .send({ name: USERS[1].name })
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
  USERS[1] = user2.data

  return true
})

afterAll(async () => {
  await reqApp.get(url(`/users/del/${USERS[0].id}`))
    .set('Content-Type', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  await reqApp.get(url(`/users/del/${USERS[1].id}`))
    .expect('Content-Type', /json/)
    .expect(200)

  return true
})

describe('TEST TO MATCHES', () => {
  let matchId
  
  test('ADD MATCH TO /api/v1/matches', () => {
    const users = USERS.map(user => user.id)
    return reqApp
      .post(url('/matches'))
      .send({
        users,
        rounds: []
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        matchId = body.data.id
        expect(body.data).toMatchObject({
          id: expect.any(String),
          users: users,
          rounds: []
        })
      })
  })

  test('FIND MATCH TO /api/v1/matches', () => {
    const users = USERS.map(user => user.id)
    return reqApp
      .get(url(`/matches/${matchId}`))
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toMatchObject({
          id: expect.any(String),
          users: users,
          rounds: []
        })
      })
  })

  test('ADD ROUND TO MATCH TO /api/v1/matches/addRound', () => {
    const users = USERS.map(user => user.id)
    return reqApp
      .post(url(`/matches/addRound/${matchId}`))
      .send({
        winner: users[0],
        loser: users[1],
        winnerHand: 1,
        loserHand: 2
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toMatchObject({
          id: expect.any(String),
          users: users,
          rounds: expect.arrayContaining([
            expect.objectContaining({
              winner: expect.any(String),
              loser: expect.any(String),
              winnerHand: expect.any(Number),
              loserHand: expect.any(Number)
            })
          ])
        })
      })
  })

  test('FIND MATCH BY USERS TO /api/v1/matches/byUsers/:id1/:id2', () => {
    const users = USERS.map(user => user.id)

    return reqApp
      .get(url(`/matches/byUsers/${USERS[0].id}/${USERS[1].id}`))
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              users: users
            })
          ])
        )
      })
  })

  test('FIND MATCH BY USER TO /api/v1/matches/byUser', () => {
    const users = USERS.map(user => user.id)
    return reqApp
      .get(url(`/matches/byUser/${USERS[0].id}`))
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              users: users,
              // winner: expect.any(String),
              // loser: expect.any(String),
              rounds: expect.arrayContaining([
                expect.objectContaining({
                  winner: expect.any(String),
                  loser: expect.any(String),
                  winnerHand: expect.any(Number),
                  loserHand: expect.any(Number)
                })
              ])
            })
          ])
        )
      })
  })
  test('FINISH MATCH TO /api/v1/matches/finished', () => {
    const users = USERS.map(user => user.id)
    return reqApp
      .post(url(`/matches/finished/${matchId}`))
      .send({
        winner: users[0],
        loser: users[1]
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(({ body }) => {
        expect(body.data).toMatchObject({
          id: expect.any(String),
          users: users,
          winner: users[0],
          loser: users[1],
          rounds: expect.arrayContaining([
            expect.objectContaining({
              winner: expect.any(String),
              loser: expect.any(String),
              winnerHand: expect.any(Number),
              loserHand: expect.any(Number)
            })
          ])
        })
      })
  })

  test('DELETE MATCH TO /api/v1/matches/del', () => {
    return reqApp
      .get(url(`/matches/del/${matchId}`))
      .expect('Content-Type', /json/)
      .expect(200)
  })
})