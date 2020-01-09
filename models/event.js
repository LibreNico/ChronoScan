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
  challenge: {
    type: String,
    required: false
  },
  distance: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  organization: {
    type: String,
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

eventSchema.pre('deleteOne', function (next) {
  const eventId = this.getQuery()["_id"];
  mongoose.model('Subscriber').deleteMany({'event_id': eventId}, function (err, result) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      console.log('Deleted all subcribers link to'+eventId);
      next();
    }
  });
});

module.exports = mongoose.model('Event', eventSchema)
