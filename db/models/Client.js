const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  redirectUris: {
    type: Array,
    required: true
  },
  grants: {
    type: Array,
    required: true
  },
  secret: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userid: {
    type: String,
    required: true,
    trim: true
  }
});

ClientSchema.methods.toJSON = function() {
  const client = this.toObject();
  client.id = client._id;
  delete client._id;
  return client;
};

const Client = mongoose.model('Client', ClientSchema);

module.exports = { Client };