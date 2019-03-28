const server = require('./src/config/server');
const primus = require('./src/config/primus')(server);

primus.save(__dirname + '/socket.js', err => {
    if (err) console.log(err);
});
