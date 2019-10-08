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

  primus.validate('project:join', (data, next) => {
    next();
  });

  primus.validate('project:leave', (data, next) => {
    next();
  });

  primus.validate('file:create', (data, next) => {
    next();
  });

  primus.validate('file:delete', (data, next) => {
    next();
  });

  primus.validate('file:open', (data, next) => {
    next();
  });

  primus.validate('file:write', (data, next) => {
    next();
  });

  primus.validate('file:close', (data, next) => {
    next();
  });

  primus.validate('channel:create', (data, next) => {
    next();
  });

  primus.validate('channel:delete', (data, next) => {
    next();
  });

  primus.validate('channel:open', (data, next) => {
    next();
  });

  primus.validate('channel:write', (data, next) => {
    next();
  });

  primus.validate('channel:close', (data, next) => {
    next();
  });

  primus.validate('terminal:create', (data, next) => {
    next();
  });

  primus.validate('terminal:delete', (data, next) => {
    next();
  });

  primus.validate('terminal:open', (data, next) => {
    next();
  });

  primus.validate('terminal:write', (data, next) => {
    next();
  });

  primus.validate('terminal:close', (data, next) => {
    next();
  });

  primus.validate('cix:startup', (data, next) => {
    next();
  });

  primus.validate('cix:status', (data, next) => {
    next();
  });

  primus.on('connection', async spark => {
    //spark.emit('server:requestAuthorization');
    await Store.addUserOnFile(null, spark.id);
    primus.forward.broadcast({ emit: ['server:broadcast', `UserID:${spark.id} connected.`] }, (err, result) => { });

    // --------------------------------------------------------

    spark.on('project:join', async data => {

      spark.emit('project:userJoined');
    });

    spark.on('project:leave', async data => {

      spark.emit('project:userLeft');
    });

    // --------------------------------------------------------

    spark.on('file:create', async data => {

      spark.emit('file:created');
    });

    spark.on('file:delete', async data => {

      spark.emit('file:deleted');
    });

    spark.on('file:open', async data => {

      spark.emit('file:userJoined');
    });

    spark.on('file:write', async data => {
      const users = await Store.getUsersToBroadcastOnFile(null, spark.id);
      primus.forward.sparks(users, { emit: ['file:userWrite', data] }, (err, result) => { });
    });

    spark.on('file:close', async data => {

      spark.emit('file:userLeft');
    });

    // --------------------------------------------------------

    spark.on('channel:create', async data => {

      spark.emit('channel:created');
    });

    spark.on('channel:delete', async data => {

      spark.emit('channel:deleted');
    });

    spark.on('channel:open', async data => {

      spark.emit('channel:userJoined');
    });

    spark.on('channel:write', async data => {

      spark.emit('channel:userWrite');
    });

    spark.on('channel:close', async data => {

      spark.emit('channel:userLeft');
    });

    // --------------------------------------------------------

    spark.on('terminal:create', async data => {

      spark.emit('terminal:created');
    });

    spark.on('terminal:delete', async data => {

      spark.emit('terminal:deleted');
    });

    spark.on('terminal:open', async data => {

      spark.emit('terminal:userJoined');
    });

    spark.on('terminal:write', async data => {

      spark.emit('terminal:userWrite');
    });

    spark.on('terminal:close', async data => {

      spark.emit('terminal:userLeft');
    });

    // --------------------------------------------------------

    spark.on('cix:startup', async data => {

    });

    spark.on('cix:status', async data => {

    });

    // --------------------------------------------------------

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

// spark.on('editor:requestSync', async data => {
//   const content = await Store.getFileContent();
//   spark.emit('server:sendFileContent', content);
// });

// spark.on('editor:sendFileContent', async data => {
//   await Store.setFileContent(null, data);
// });

// spark.on('editor:broadcastOperation', async operation => {
//   const users = await Store.getUsersToBroadcastOnFile(null, spark.id);
//   setTimeout(() => {
//     primus.forward.sparks(users, { emit: ['server:executeOperation', operation] }, (err, result) => { });
//   }, 1);
// });

// spark.on('cix:requestSync', async data => {
//   console.log(data);
// });

/*

[EMIT] cix:startup
[ON] integration:fetchProjectData -> [EMIT] cix:status { projectId, status, req }
[ON] integration:createFile -> [EMIT] cix:status { projectId, status, req }
[ON] integration:removeFile -> [EMIT] cix:status { projectId, status, req }
[ON] integration:moveFile -> [EMIT] cix:status { projectId, status, req }
[ON] integration:writeFile -> [EMIT] cix:status { projectId, status, req }
[ON] integration:shellCommand -> [EMIT] cix:shellOutput { projectId }


*/