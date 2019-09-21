const path = require('path');

const { port, host } = require(path.resolve('./settings.json'));
const { fast, listen } = require('./src/config/server');

const PORT = process.env.PORT || port;
const HOST = process.env.PORT || host;

listen(PORT, HOST);