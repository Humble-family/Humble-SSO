const express = require('express');

const router = express.Router();

require('./oauth/oauth')(router);
require('./db/database')(router);
require('./gui/gui')(router);

module.exports = router;