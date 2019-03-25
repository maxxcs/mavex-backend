const Primus = require('primus');
const Redis = require('ioredis');

const omega = require('omega-supreme'); 
const metroplex = require('metroplex');
const emit = require('primus-emit');

module.exports = server => {
    const primus = new Primus(server, {
        transformer: 'websockets',
        method: 'PUT',
        password: 'supreme',
        username: 'omega',
        url: '/primus/omega/supreme',
        concurrently: 10,
        namespace: 'metroplex',
        redis: new Redis()
    });

    primus.plugin('omega-supreme', omega);
    primus.plugin('metroplex', metroplex);

    primus.on('connection', spark => {
        //console.log(spark.id);
    
        spark.on('data', data => {
            console.log(data);
            spark.write('PONG!');
            primus.forward.broadcast('3423432423432', (err, result) => {
                console.log(result);
            });
        });
    });

    return primus;
};
