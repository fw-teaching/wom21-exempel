const express = require('express')
const router = express.Router()
const Note = require('../models/notesModel')


const notes = [{ text: "gamla objektet!"}]

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find()
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

router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await Note.deleteOne({ _id: req.params.id }).exec()
        res.json({message: "Note deleted!", deleted: deletedNote.deletedCount})

    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router