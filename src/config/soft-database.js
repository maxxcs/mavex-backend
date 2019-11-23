const Redis = require('ioredis');
const store = new Redis();

module.exports = store;
