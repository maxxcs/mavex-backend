const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);
require('./primus')(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet({ noCache: true }));

require('./routes')(app);

module.exports = server;
