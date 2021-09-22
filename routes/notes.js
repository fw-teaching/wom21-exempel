const express = require('express')
const router = express.Router()
const Note = require('../models/notesModel')
const authorize = require('../middleware/authorize')



router.get('/', async (req, res) => {
    try {
        const notes = [ {"text": "hello" } ]//await Note.find({ archived: { $ne: true } })

        res.send(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.use(authorize)

router.get('/archived', async (req, res) => {
    try {
        const notes = await Note.find({ archived: true })
        res.send(notes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post('/', async (req, res) => {
    try {
        const note = new Note({
            text: req.body.text
        })
        const newNote = await note.save()
        res.status(201).send(newNote)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const getNoteById = async (req, res, next) => {
    const note = await Note.findOne({ _id: req.params.id }).exec()
    if (!note) return res.status(404).json({message: 'Note not found'})
    req.note = note
    next()
}

router.get('/:id', getNoteById, async (req, res) => {
    try {
        res.send(req.note)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put('/:id', getNoteById, async (req, res) => {
    try {
        const updatedNote = await req.note.updateOne(req.body).exec()
        res.json({message: "Note updated!", modified: updatedNote.modifiedCount})

    } catch (error) {
        res.status(500).send(error.message)
    }

})

router.delete('/:id', getNoteById, async (req, res) => {
    try {
        if (req.note.archived) {
            // Om noten är arkiverad, radera permanent
            await Note.deleteOne({ _id: req.params.id }).exec()
            res.json({message: "Note deleted!" })

        } else {
            // Om noten inte är arkiverad, arkivera
            await req.note.updateOne({ archived: true })
            res.json({message: "Note archived!" })
        }


    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router