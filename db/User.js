const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  avatar: {
    type: String,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  humblemail: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  apps: {
    type: Array,
    default: []
  },
  twofa: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  token: {
    type: String,
    required: true,
    trim: true
  }
});

UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  return _.pick(userObject, ['_id', 'mail']);
};

UserSchema.statics.findByCredentials = function(mail, password) {
  return this.findOne({ mail }).then(user => {
    if(!user) return Promise.reject('User not found');
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) resolve(user);
        else reject('Wrong password');
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    bcrypt.genSalt(16, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        console.log(err, hash);
        this.password = hash;
        console.log(hash);
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };