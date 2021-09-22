const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({ 
    text: String,
    archived: Boolean
}, { timestamps: true })

module.exports = mongoose.model(
    'Note', 
    notesSchema
)
