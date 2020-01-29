const moment = require('moment');

module.exports = class BackendError extends Error {
  constructor(code, message, originalMessage) {
    super(originalMessage);
    this.code = code;
    this.message = message;
  }
  log() {
    console.error(`Error ${this.code}: ${this.message} - ${moment().format('YYYY-MM-DD HH:mm:ss')}, \n ${this.originalMessage}`);
    return this;
  }
}

/**
 * Codes:
 *  400: client error
 *  - 401: requested id is not an integer
 *  - 403: wrong password
 *  - 404: requested id not found
 *  500: server error
 *  - 503: database error
 *  - 511: password could not be crypted
 */