const express = require('express')
const bodyParser = require('body-parser')

const moviesRouter = require('./routes/movies')
const commentsRouter = require('./routes/comments')

// Database
const db = require('./database/config')

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express()

app.use(bodyParser.json())
app.use('/movies', moviesRouter)
app.use('/comments', commentsRouter)

module.exports = app
