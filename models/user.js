const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

var userRollSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
	status:{
        type:String,
        required:true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('UserRoll', userRollSchema,'userRoll');