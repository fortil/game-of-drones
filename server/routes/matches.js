const shortid = require('shortid')

const get = db => (_, res) => {
  const matches = db.get('matches').value()
  res.json({ data: matches, time: (new Date()).getTime() })
}

const find = db => (req, res) => {
  let match = {}
  if (req.params.id) {
    match = db.get('matches')
      .find({ id: req.params.id })
      .value()
  }
  res.json({ data: match, time: (new Date()).getTime() })
}

const findByUserId = db => (req, res) => {
  const userId = req.params.userId
  const matchs = db.get('matches')
    .searchInDeep({
      exp: ['users[0]', 'users[1]'],
      equalTo: userId
    })
    .value()
  res.json({ data: matchs, time: (new Date()).getTime() })
}

const findByUserIds = db => (req, res) => {
  const user1 = db.get('users').find({ id: req.params.name1 }).value()
  const user2 = db.get('users').find({ id: req.params.name2 }).value()
  if (!user1 || !user2) {
    return res.json([])
  }
  const matchs = db.get('matches')
    .searchInDeep({
      exp: 'users',
      equalTo: [user1.id, user2.id]
    })
    .value()
  res.json({ data: matchs, time: (new Date()).getTime() })
}

const add = db => (req, res) => {
  if (!req.body) {
    return res.status(400).json('Does not exist any body')
  }
  const data = Object.assign({}, req.body, { id: shortid.generate() })

  db.get('matches')
    .push(data)
    .last()
    .write()
    .then(newMatch => res.json({ data: newMatch, time: (new Date()).getTime() }))
}

const finished = db => (req, res) => {
  if (!req.body || !req.params.id) {
    return res.status(400).json('Does not exist any body')
  }
  const fnData = db.get('matches').find({ id: req.params.id })
  const value = fnData.value()

  if (!value) {
    return res.status(400).json('Doesnt exist match to req')
  }

  if (!req.body.winner && !req.body.loser) {
    return res.status(400).json('Desont exist loser neither winner')
  }
  db.get('users').find({ id: req.body.winner }).update('wons', n => n ? n + 1 : 1).write()
  db.get('users').find({ id: req.body.loser }).update('losts', n => n ? n + 1 : 1).write()
  
  fnData.assign(req.body).write()
  
  const newValue = db.get('matches').find({ id: req.params.id }).value()

  res.json({ data: newValue, time: (new Date()).getTime() })
}

const addRound = db => (req, res) => {
  if (!req.body || !req.params.id) {
    return res.status(400).json('Does not exist any body')
  }

  const matchFn = db.get('matches').find({ id: req.params.id })
  const matchValue = matchFn.value()
  if (matchValue) {
    const rounds = (matchValue.rounds || []).concat(req.body)
    matchFn.assign({ rounds }).write()
    
    res.json({ data: matchFn.value(), time: (new Date()).getTime() })
  } else {
    return res.status(400).json('Does not exist the request')
  }
}

const remove = db => (req, res) => {
  if (!req.params || !req.params.id) {
    return res.status(400).json('Doesnt exist any body or name on request')
  }

  db.get('matches')
    .remove({ id: req.params.id })
    .last()
    .write()
    .then(match => {
      res.json({ data: match, time: (new Date()).getTime() })
    })
}


module.exports = {
  findByUserIds,
  findByUserId,
  addRound,
  finished,
  remove,
  find,
  get,
  add
}