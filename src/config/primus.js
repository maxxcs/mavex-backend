const Primus = require('primus');
const Redis = require('ioredis');

const fortress = require('fortress-maximus');
const omega = require('omega-supreme'); 
const metroplex = require('metroplex');
const emit = require('primus-emit');

module.exports = server => {
    const primus = new Primus(server, {
        transformer: 'websockets',
        fortress: 'spark',
        method: 'PUT',
        password: 'supreme',
        username: 'omega',
        url: '/primus/omega/supreme',
        concurrently: 10,
        namespace: 'metroplex',
        redis: new Redis()
    });

    primus.plugin('fortress maximus', fortress);
    primus.plugin('omega-supreme', omega);
    primus.plugin('metroplex', metroplex);
    primus.plugin('emit', emit);

    primus.validate('data', (data, next) => {
        console.log(`VALIDATE: ${data}`);
        next();
    });

    primus.validate('info', (data, next) => {
        next();
    });

    primus.validate('editor', (data, next) => {
        if (!data.isEcho) {
            next();
        }
    });

    primus.on('connection', spark => {
        spark.emit('msg', 'Connected!');
        primus.forward.broadcast({ emit: ['broadcast:msg', 'Broadcast: a user connected!'] }, (err, result) => {
            console.log(result);
        });

        spark.on('data', data => {
            console.log(data);
            spark.emit('msg', 'PONG!');
        });

        spark.on('info', data => {
            console.log(`Info: ${data}`);
        });

        spark.on('editor', data => {
            data.isEcho = true;
            //console.log(data);
            primus.forward.broadcast({ emit: ['editor:reflect', data] }, (err, result) => {
                console.log(result);
            });
        });
    });

    return primus;
};
