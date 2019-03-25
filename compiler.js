const primus = require('./src/config/primus');

primus.save(__dirname + '/socket.js', err => {
    if (err) console.log(err);
});
