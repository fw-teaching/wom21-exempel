const express = require('express')
const app = express()
const PORT = 3000

console.log("hello node!")

app.use('/', (req, res) => {
    //res.send("Hello Node!")
    res.json({ message: "Hello Node!"})
})

app.listen(PORT)