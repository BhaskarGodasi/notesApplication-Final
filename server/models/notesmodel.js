const mongoose = require('mongoose')

const notesmodel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    color:{
        type:String
    }
})

const notes = mongoose.model('notes',notesmodel)

module.exports = notes;