'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = new Schema({
    name: String
}, {
    collection: 'example',
    // timestamps: 
})

module.exports = mongoose.model('example', schema)