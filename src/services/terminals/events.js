const TerminalStore = require('./store');

module.exports = (primus, spark) => {

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

};