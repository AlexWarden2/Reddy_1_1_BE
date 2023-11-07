const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path');
const chance = require('chance').Chance();

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

app.get('/whiteboard/:id', (req, res) => {
  const idx = req.params.id - 1
  const note = whiteboard[idx]

  if (!note) {
    res.status(404).send({ error: `Note with id ${idx + 1} not found` })
  } else {
    res.status(200).send(note)
  }
})

<<<<<<< HEAD
app.get('/data/choosePhoto', (req, res) => {
  const randIdx = Math.floor((Math.random() * 8 + 6))
  res.send(data[randIdx]);
  // res.send(data.slice(req.params.id = 6, req.params.id = 14));
=======
app.get('/data/flag-match', (req, res) => {
  const randIdx = chance.integer({ min: 0, max: 6 -1 })
  res.send(data[randIdx]);
>>>>>>> 8308df40bf762752a5b89cf7412ff56387427e4b
})

app.get('/data/choosePhoto', (req, res) => {
  const randIdx = chance.integer({ min: 7, max: 14 -1 })
  res.send(data[randIdx]);
})

<<<<<<< HEAD
=======
app.get('/data/neigbours', (req, res) => {
  const randIdx = chance.integer({ min: 15, max: 20 -1 })
  res.send(data[randIdx]);
})

app.get('/data/dates', (req, res) => {
  const randIdx = chance.integer({ min: 21, max: 27 -1 })
  res.send(data[randIdx]);
})

app.get('/data/two-truth-one-lie', (req, res) => {
  const randIdx = chance.integer({ min: 28, max: 34 -1 })
  res.send(data[randIdx]);
})

app.get('/data/hangman', (req, res) => {
  const randIdx = chance.integer({ min: 35, max: 40 -1 })
  res.send(data[randIdx]);
})

>>>>>>> 8308df40bf762752a5b89cf7412ff56387427e4b
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
