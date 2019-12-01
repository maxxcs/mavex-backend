const GenenralStore = require('./store');
const { sign, verify } = require('../../config/auth');

module.exports = (primus, spark) => {
  spark.on('user:authenticate', async ({ token }) => {
    const { id } = await verify(token);
    spark.userId = id;
  });

  spark.on('project:join', async ({ projectId, token }) => {
    try {
      const { id, username } = await verify(token);
      await GenenralStore.addUserOnProject(projectId, { id, username, socket: spark.id });

      const sockets = await GenenralStore.getSocketsToBroadcastOnProject(projectId);
      // console.log(sockets)
      primus.forward.sparks(sockets, { emit: ['project:userJoined', { username }] }, (err, result) => { });
    } catch (err) {
      console.log(err);
    }
  });

  spark.on('project:leave', async () => {
    try {
      if (spark.userId) await GenenralStore.removeUser(spark.userId);
      spark.emit('project:userLeft');

    } catch (err) {
      console.log(err)
    }
  });

  spark.on('cix:startup', async data => {

  });

  spark.on('cix:status', async data => {

  });

  spark.on('end', async () => {
    try {
      if (spark.userId)
        await GenenralStore.removeUser(spark.userId);

    } catch (err) {
      console.log(err)
    }
  });
}