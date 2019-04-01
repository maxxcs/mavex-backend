const Primus = require('primus');
const Redis = require('ioredis');

const fortress = require('fortress-maximus');
const omega = require('omega-supreme'); 
const metroplex = require('metroplex');
const emit = require('primus-emit');

const Store = require('../services/Store');

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

    primus.authorize((req, done) => {
        //console.log(req.headers);
        done();
    });

    primus.validate('editor:contentChanged', (data, next) => {
        next();
    });

    primus.on('connection', async spark => {
        //spark.emit('server:requestAuthorization');
        await Store.addUserOnFile(null, spark.id);
        primus.forward.broadcast({ emit: ['server:broadcast', `UserID:${spark.id} connected.`] }, (err, result) => {});
        
        spark.on('editor:contentChanged', async data => {
            const users = await Store.getUsersToBroadcastOnFile(null, spark.id);
            primus.forward.sparks(users, { emit: ['server:executeEdits', data] }, (err, result) => {});
        });

        spark.on('end', async () => {
            Store.removeUserFromFile(null, spark.id);
        });
    });

    primus.on('error', err => {
        console.log('Something horrible has happened!', err.stack);
    });

    return primus;
};
