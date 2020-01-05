const express = require('express');

const router = express.Router();

require('./oauth/oauth')(router);
require('./db/database')(router);

module.exports = router;