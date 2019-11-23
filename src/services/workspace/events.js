const WorkspaceStore = require('./store');

module.exports = (primus, spark) => {

  spark.on('file:create', async data => {

    spark.emit('file:created');
  });

  spark.on('file:delete', async data => {

    spark.emit('file:deleted');
  });

  spark.on('file:open', async data => {
    await WorkspaceStore.addUserOnFile(null, spark.id);
    spark.emit('file:userJoined');
  });

  spark.on('file:write', async data => {
    const users = await WorkspaceStore.getUsersToBroadcastOnFile(null, spark.id);
    primus.forward.sparks(users, { emit: ['file:userWrite', data] }, (err, result) => { });
  });

  spark.on('file:close', async data => {
    await WorkspaceStore.removeUserFromFile(null, spark.id);
    spark.emit('file:userLeft');
  });

};