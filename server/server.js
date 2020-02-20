require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true , useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

const eventsRouter = require('./routes/events')
app.use('/events', eventsRouter)

const uersersRouter = require('./routes/users')
app.use('/users', uersersRouter)

app.listen(3000, () => console.log('server started'))




