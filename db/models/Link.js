const mongoose = require('mongoose');
const _ = require('lodash');

const LinkSchema = new mongoose.Schema({
  serviceid: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userid: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  scopes: {
    type: Array,
    required: true,
    default: []
  },
  refreshToken: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  }
});

LinkSchema.methods.toJSON = function() {
  const linkObject = this.toObject();
  const link = _.pick(linkObject, ['_id', 'userid', 'scopes', 'username']);
  link.id = linkObject._id;
  delete link._id;
  return link;
};

const Link = mongoose.model('Service', LinkSchema);

module.exports = { Link };