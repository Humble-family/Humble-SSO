const mongoose = require('mongoose');

const AuthorizationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    trim: true
  },
  redirectUri: {
    type: String,
    required: false,
    trim: true
  },
  scope: {
    type: String,
    required: true,
    trim: true
  },
  clientid: {
    type: String,
    required: true,
    trim: true
  },
  userid: {
    type: String,
    required: true,
    trim: true
  }
});

AuthorizationCodeSchema.methods.toJSON = function() {
  const ac = this.toObject();
  ac.id = ac._id;
  delete ac._id;
  return ac;
};

const AuthorizationCode = mongoose.model('AuthorizationCode', AuthorizationCodeSchema);

module.exports = { AuthorizationCode };