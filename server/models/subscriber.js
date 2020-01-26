const mongoose = require('mongoose')
const Counters = require('./counter')
const ObjectId = mongoose.Schema.Types.ObjectId;
const counterId = "bankSeq";


var subscriberSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  gender: {
    type: Boolean,
    required: true
  },
  postalCode: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  club: {
    type: String,
    required: false
  },
  challenge: {
    type: Boolean,
    required: true
  },
  bankTransferId: {
    type: String,
    unique: true
  },
  active: {
    type: Boolean,
    default: false
  },
  event_id: {
    type: ObjectId,
    required: true,
    ref: 'Event',
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  birthDate: {
    type: Date,
    required: true
  }
})

//TODO unit test
//+++YYY/YNNN/NNNXX+++ >> 1231234123456 >> +++123/1234/123456+++
function formatBankTransferId(id){
  return "+++"+id.substring(0,3)+"/"+id.substring(3,7)+"/"+id.substring(7,13)+"+++";
}

function generateStructureBankTransfer(seq){
  const checkDigit = new String(seq % 97).padStart(2, '0');
  const YYYY = new String(new Date().getFullYear());
  const counter = new String(seq).padStart(6, '0'); 
  return formatBankTransferId(YYYY.concat(counter).concat(checkDigit));
}


subscriberSchema.pre('save', function(next){
  var doc = this;
  Counters.findByIdAndUpdate(
      { _id: counterId },
      { $inc : { seq: 1 } },
      { new: true, upsert: true },  
      function(err, counter){
          if(err) return next(err);
          doc.bankTransferId = generateStructureBankTransfer(counter.seq);
          next();
      }
  );
}
);

module.exports = mongoose.model('Subscriber', subscriberSchema)
