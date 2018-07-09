const get = db => (req, res) => {
  const hands = db.get('hands').value()
  res.json({ data: hands, time: (new Date()).getTime() })
}

module.exports = {
  get
}