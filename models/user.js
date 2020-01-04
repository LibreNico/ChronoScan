const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')
const fs = require('fs');

const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
const privateKEY = fs.readFileSync('./keys/private.key', 'utf8');
const signOptions = {
    issuer: 'Nicolas Crappe',
    subject: 'joggansgroup@gmail.com',
    audience: 'http://www.joggans.be',
    expiresIn: "48h",
    algorithm: "RS256"
};


var UserSchema = mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required!'],
      trim: true,
      validate: {
        validator(email) {
          return validator.isEmail(email);
        },
        message: '{VALUE} is not a valid email!',
      },
    },
    firstName: {
      type: String,
      required: [true, 'FirstName is required!'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'LastName is required!'],
      trim: true,
    },
    club: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
      trim: true,
      minlength: [6, 'Password need to be longer!'],
      validate: {
        validator(password) {
          return passwordReg.test(password);
        },
        message: 'Password is not valid! It should contains digit capital and low letters.',
      },
    }
  },{ timestamps: true });

  UserSchema.plugin(uniqueValidator, {
    message: '{VALUE} already taken!',
  });
  
  UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = this._hashPassword(this.password);
    }
  
    return next();
  });

  UserSchema.methods = {
    _hashPassword(password) {
      return bcrypt.hashSync(password);
    },
    authenticateUser(password) {
      return bcrypt.compareSync(password, this.password);
    },
    createToken() {
        const payload = {
            _id: this._id,
        };
      return jwt.sign(
        payload,
        privateKEY,
        signOptions
      );
    },
    toAuthJSON() {
      return {
        _id: this._id,
        token: `Bearer ${this.createToken()}`,
      };
    },
    toJSON() {
      return {
        _id: this._id
      };
    },
  
  };

module.exports = mongoose.model('User', UserSchema);