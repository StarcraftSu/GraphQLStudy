const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authorSchema = new Schema({
    name:String,
    age:Number
})
//model refers to a collection of data
module.exports = mongoose.model('Author',authorSchema)