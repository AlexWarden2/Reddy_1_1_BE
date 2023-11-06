const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path');

const logger = require('./logger')
const whiteboard = require('./whiteboard')
const data = require('./data')

const app = express() //create server

//MIDLEWARE
app.use(cors())
app.use(logger)
app.use(express.json())


app.get('/', (req, res) => {
  res.status(200).json({ message: `Here is our server!` })
})

//get entire database
app.get('/data', (req, res) => {
  res.send(data)
})


app.get('/whiteboard', (req, res) => {
  res.send(whiteboard)
})

//get entire database
app.get('/data', (req, res) => {
  res.send(data)
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

//get data by id
app.get('/data/:id', (req, res) => {
  const idx = req.params.id - 1
  const note = data[idx]

  if (!note) {
    res.status(404).send({ error: `Note with id ${idx + 1} not found` })
  } else {
    res.status(200).send(note)
  }
})

app.post('/whiteboard', (req, res) => {
  const lastNote = whiteboard[whiteboard.length - 1]
  const lastID = lastNote ? lastNote.id + 1 : 1
  const note = { id: lastID, text: " " };
  const filePath = path.join(process.cwd(), 'whiteboard.json');

  try {
    const contents = fs.readFileSync(filePath, 'utf8');
    let jsonString = JSON.parse(contents);
    jsonString = jsonString.concat(note);
    fs.writeFile('./whiteboard.json', JSON.stringify(jsonString), err => {
      if (err) {
        console.log('Error writing file', err)
      } else {
        console.log('Successfully wrote file')
      }
    })
  } catch (err) {
    console.error(err);
  }
  
  whiteboard.push(note)
  res.status(201).send(note)
})


module.exports = app;
