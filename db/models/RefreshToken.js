const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
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

RefreshTokenSchema.methods.toJSON = function() {
  const rt = this.toObject();
  rt.id = rt._id;
  delete rt._id;
  return rt;
};

const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports = { RefreshToken };