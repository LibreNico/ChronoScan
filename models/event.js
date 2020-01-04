const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: false
  },
  challenges: {
    type: Array,
    required: false
  },
  distances: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: ObjectId,
    ref: 'User',
  }
})

module.exports = mongoose.model('Event', eventSchema)
