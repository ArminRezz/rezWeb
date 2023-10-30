const mongoose = require('mongoose')

const Schema = mongoose.Schema

const artSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: false
    },
    originDate: {
        type: Date,
        required: true
    },
    originLocation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Art', artSchema)