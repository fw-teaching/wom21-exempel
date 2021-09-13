require('dotenv').config() // läs in .env-filen
const express = require('express')
const app = express()
const PORT = 3000

console.log(process.env.TEST) // Skriv ut variabel från .env 

console.log("hello node!")

// Vår API ska ta emot requests i JSON-format
app.use(express.json())

app.get('/', (req, res) => {
    //res.send("Hello Node!")
    res.json({ message: "Hello Node!"})
})

// Vi importerar vår notes route-modul
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
