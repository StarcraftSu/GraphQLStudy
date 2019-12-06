const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookSchema = new Schema({
    name:String,
    genre:String,
    authorId:String
})
//model refers to a collection of data
module.exports = mongoose.model('Book',bookSchema)