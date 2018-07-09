const App = require('./app')
App.then(app => {
  app.listen(8080, () => console.log('listening on port 8080'))
})