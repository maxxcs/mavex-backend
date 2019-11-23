const Primus = require('primus');
const Redis = require('ioredis');

const fortress = require('fortress-maximus');
const omega = require('omega-supreme');
const metroplex = require('metroplex');
const emit = require('primus-emit');

const Store = require('./soft-database');

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

  // primus.plugin('fortress maximus', fortress);
  primus.plugin('omega-supreme', omega);
  primus.plugin('metroplex', metroplex);
  primus.plugin('emit', emit);

  primus.authorize((req, done) => {
    //console.log(req.headers);
    done();
  });

  // primus.validate('project:join', (data, next) => {
  //   next();
  // });

  // primus.validate('project:leave', (data, next) => {
  //   next();
  // });

  // primus.validate('file:create', (data, next) => {
  //   next();
  // });

  // primus.validate('file:delete', (data, next) => {
  //   next();
  // });

  // primus.validate('file:open', (data, next) => {
  //   next();
  // });

  // primus.validate('file:write', (data, next) => {
  //   next();
  // });

  // primus.validate('file:close', (data, next) => {
  //   next();
  // });

  // primus.validate('channel:create', (data, next) => {
  //   next();
  // });

  // primus.validate('channel:delete', (data, next) => {
  //   next();
  // });

  // primus.validate('channel:open', (data, next) => {
  //   next();
  // });

  // primus.validate('channel:write', (data, next) => {
  //   next();
  // });

  // primus.validate('channel:close', (data, next) => {
  //   next();
  // });

  // primus.validate('terminal:create', (data, next) => {
  //   next();
  // });

  // primus.validate('terminal:delete', (data, next) => {
  //   next();
  // });

  // primus.validate('terminal:open', (data, next) => {
  //   next();
  // });

  // primus.validate('terminal:write', (data, next) => {
  //   next();
  // });

  // primus.validate('terminal:close', (data, next) => {
  //   next();
  // });

  // primus.validate('cix:startup', (data, next) => {
  //   next();
  // });

  // primus.validate('cix:status', (data, next) => {
  //   next();
  // });

  primus.on('connection', async spark => {
    //spark.emit('server:requestAuthorization');
    primus.forward.broadcast({ emit: ['server:broadcast', `UserID:${spark.id} connected.`] }, (err, result) => { });

    require('../services/general/events')(primus, spark);
    require('../services/workspace/events')(primus, spark);
    require('../services/channels/events')(primus, spark);
    require('../services/terminals/events')(primus, spark);

  });

  primus.on('error', err => {
    console.log('Something horrible has happened!', err.stack);
  });

  return primus;
};
