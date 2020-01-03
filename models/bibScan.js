const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const bibScanSchema = new mongoose.Schema({
  bib: {
    type: String,
    required: true
  },
  event_id: {
    type: ObjectId,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('BibScan', bibScanSchema)
