require('dotenv').config() // läs in .env-filen
const express = require('express')
const app = express()

// Mongoose connection 
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to DB'))

const PORT = process.env.PORT || 3000

// Vår API ska ta emot requests i JSON-format
app.use(express.json())

app.use('/', express.static(__dirname + '/html'))

/*app.get('/', (req, res) => {
    //res.send("Hello Node!")
    res.json({ message: "Hello Node!"})
})*/

// Vi importerar vår notes route-modul
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
