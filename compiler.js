const path = require('path');
const server = require('./src/config/server');
const primus = require('./src/config/primus')(server);

const filename = '/socket.js'

primus.save(path.join(__dirname, filename), err => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log('Client library compiled successfully.');
    process.exit(0);
  }
});
