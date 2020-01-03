const mongoose = require('mongoose')

var counterSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        seq: { type: Number, default: 111111 }
    }
  );
counterSchema.index({ _id: 1, seq: 1 }, { unique: true })
    
module.exports = mongoose.model('Counters', counterSchema);
