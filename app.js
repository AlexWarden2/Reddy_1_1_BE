const express = require('express')
const cors = require('cors')

const logger = require('./logger')
const whiteboard = require('./whiteboard')

const app = express() //create server

//MIDLEWARE
app.use(cors())
app.use(logger)
app.use(express.json())


app.get('/', (req, res) => {
  res.status(200).json({ message: `Here is our server!` })
})

app.get('/whiteboard', (req, res) => {
  res.send(whiteboard)
})

app.get('/whiteboard/:id', (req, res) => {
  const idx = req.params.id - 1
  const note = whiteboard[idx]

  if (!note) {
    res.status(404).send({ error: `Note with id ${idx + 1} not found` })
  } else {
    res.status(200).send(note)
  }
})

module.exports = app;
