const mongoose = require('mongoose');

const AccessTokenSchema = new mongoose.Schema({
  accessToken: {
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
  scope: {
    type: String,
    required: true,
    trim: true,
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

AccessTokenSchema.methods.toJSON = function() {
  const at = this.toObject();
  at.id = at._id;
  delete at._id;
  return at;
};

const AccessToken = mongoose.model('AccessToken', AccessTokenSchema);

module.exports = { AccessToken };