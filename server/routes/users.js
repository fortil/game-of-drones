const shortid = require('shortid')

const findUser = (db, name, id) => {
  return db.get('users')
    .find(name ? { name } : id ? { id } : { name: null })
    .value()
}

const createUser = (db, name) => {
  return db.get('users')
    .push({ id: shortid.generate(), name, wons: 0, losts: 0 })
    .last()
    .write()
    .then(user => user)
}

const get = db => (_, res) => {
  const users = db.get('users').value()
  res.json({ data: users, time: (new Date()).getTime() })
}

const findTeamByID = db => (req, res) => {
  if (!req.params || ((req.params && !req.params.id1) || (req.params && !req.params.id2))) {
    return res.status(400).json('Send params correctly')
  }

  const user1 = findUser(db, null, req.params.id1)
  const user2 = findUser(db, null, req.params.id2)
  if (!user1 || !user2) {
    return res.status(400).json('Doesnt exist the users to consult')
  }
  res.status(200).json({ data: [user1, user2], time: (new Date()).getTime() })
}

const find = db => (req, res) => {
  let user = {}
  if (req.params.id) {
    user = findUser(db, null, req.params.id)
  }
  res.json({ data: user, time: (new Date()).getTime() })
}

const findTeam = db => async (req, res) => {
  if (!req.params || ((req.params && !req.params.userName1) || (req.params && !req.params.userName2))) {
    return res.status(400).json('Send params correctly')
  }

  let user1 = {}
  let user2 = {}
  user1 = findUser(db, req.params.userName1)
  if (!user1) {
    user1 = await createUser(db, req.params.userName1)
  }
  user2 = findUser(db, req.params.userName2)
  if (!user2) {
    user2 = await createUser(db, req.params.userName2)
  }
  res.status(200).json({ data: [user1, user2], time: (new Date()).getTime() })
}

const add = db => (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json('Doesnt exist any body or name on request')
  }
  const user = findUser(db, req.body.name)

  if (user) {
    return res.json(user)
  }
  createUser(db, req.body.name).then(user => res.json({ data: user, time: (new Date()).getTime() }))    
}

const remove = db => (req, res) => {
  if (!req.params || !req.params.id) {
    return res.status(400).json('Doesnt exist any body or name on request')
  }

  db.get('users')
    .remove({ id: req.params.id })
    .last()
    .write()
    .then(user => {
      res.json({ data: user, time: (new Date()).getTime() })
    })
}

module.exports = {
  findTeamByID,
  findTeam,
  remove,
  find,
  get,
  add
}