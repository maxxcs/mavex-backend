const Primus = require('primus');
const Redis = require('ioredis');

const fortress = require('fortress-maximus');
const omega = require('omega-supreme');
const metroplex = require('metroplex');
const emit = require('primus-emit');

const Store = require('../services/store');

module.exports = server => {
  const primus = new Primus(server, {
    transformer: 'websockets',
    fortress: 'spark',
    method: 'PUT',
    username: 'mavex',
    password: 'mavex',
    url: '/broadcast',
    concurrently: 10,
    namespace: 'cluster',
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

  primus.validate('editor:requestSync', (data, next) => {
    next();
  });

  primus.validate('editor:sendFileContent', (data, next) => {
    next();
  });

  primus.validate('editor:broadcastOperation', (data, next) => {
    next();
  });

  primus.validate('xve:requestSync', (data, next) => {
    next();
  });

  primus.on('connection', async spark => {
    //spark.emit('server:requestAuthorization');
    await Store.addUserOnFile(null, spark.id);
    primus.forward.broadcast({ emit: ['server:broadcast', `UserID:${spark.id} connected.`] }, (err, result) => { });

    spark.on('editor:requestSync', async data => {
      const content = await Store.getFileContent();
      spark.emit('server:sendFileContent', content);
    });

    spark.on('editor:sendFileContent', async data => {
      await Store.setFileContent(null, data);
    });

    spark.on('editor:broadcastOperation', async operation => {
      const users = await Store.getUsersToBroadcastOnFile(null, spark.id);
      setTimeout(() => {
        primus.forward.sparks(users, { emit: ['server:executeOperation', operation] }, (err, result) => {});
      }, 1);
    });

    spark.on('xve:requestSync', async data => {
      console.log(data);
    });

    spark.on('end', async () => {
      //Remove the spark from all files and projects
      await Store.removeUserFromFile(null, spark.id);
    });
  });

  primus.on('error', err => {
    console.log('Something horrible has happened!', err.stack);
  });

  return primus;
};
