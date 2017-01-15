var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Working!')
})

app.listen(process.env.PORT || 8888, function () {
  console.log('Server working properly on ' + (process.env.PORT || 8888))
})
