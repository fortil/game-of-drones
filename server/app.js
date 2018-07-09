const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const { user, match, hand } = require('./routes')
const { findEquals } = require('./utils')

const version = '/api/v1'

const url = route => `${version}${route}`

// Create server
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Create database instance and start server
const adapter = new FileAsync('db.json')
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (_, res) => res.json({ data: 'Hello world', time: (new Date()).getTime() }))

const App = low(adapter)
  .then(db => {
    /* 
    Personal mixin to find in deep
    */
    db._.mixin({
      searchInDeep: (array, { exp, equalTo }) => {
        const filter = findEquals(exp, equalTo)
        const resp = array.filter(filter)
        return resp
      }
    })
    // All Routes

    app.get(url('/users/del/:id'), user.remove(db))
    app.get(url('/users/:userName1/:userName2'), user.findTeam(db))
    app.get(url('/usersById/:id1/:id2'), user.findTeamByID(db))
    app.get(url('/users/:id'), user.find(db))
    app.get(url('/users'), user.get(db))
    app.post(url('/users'), user.add(db))
    
    app.get(url('/matches/byUsers/:name1/:name2'), match.findByUserIds(db))
    app.get(url('/matches/del/:id'), match.remove(db))
    app.get(url('/matches/byUser/:userId'), match.findByUserId(db))
    app.get(url('/matches/:id'), match.find(db))
    app.post(url('/matches/addRound/:id'), match.addRound(db))
    app.post(url('/matches/finished/:id'), match.finished(db))
    app.get(url('/matches'), match.get(db))
    app.post(url('/matches'), match.add(db))

    app.get(url('/hands'), hand.get(db))

    // Set db default values
    return db.defaults({ 
      users: [], 
      matches: [], 
      hands: [
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
    }).write()
  })
  .then(() => app)
  
module.exports = App