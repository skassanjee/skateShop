const mongoose = require('mongoose')
const Schema= mongoose.Schema

let pageSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    slug : {
        type: String
        },
    content : {
        type: String,
        required: true
    },
    sorting : {
        type: Number
    }
})

module.exports = mongoose.model('page', pageSchema)