const express = require('express')
const router = express.Router()

const notes = [
    { text: "Köp gräddfil" }, // 0
    { text: "Gym i dag" }     // 1
]

// Middleware
const logMethod = (req, res, next) => {
    console.log(req.method)
    next()
}

//router.use(logMethod)

router.get('/', (req, res) => {
    res.send(notes)
})

router.post('/', logMethod, (req, res) => {
    notes.push(req.body)
    res.status(201).json({message: "Note created!"})
})

router.put('/:id', logMethod, (req, res) => {
    console.log(req.params.id);

    try {
        notes[req.params.id] = req.body
        res.json({message: "Note updated!"})

    } catch (error) {
        res.status(500).send(error.message)
    }

})



console.log("notes")

module.exports = router