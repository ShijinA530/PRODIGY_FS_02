const mongoose = require('mongoose')

const Schema = mongoose.Schema

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        length: 10,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    hobbies: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Person', personSchema)
