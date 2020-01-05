const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

ServiceSchema.methods.toJSON = function() {
  const service = this.toObject();
  service.id = service._id;
  delete service._id;
  return service;
};

const Service = mongoose.model('Service', ServiceSchema);

module.exports = { Service };