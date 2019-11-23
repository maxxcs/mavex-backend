const ChannelStore = require('./store');

module.exports = (primus, spark) => {

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

};