const GenenralStore = require('./store');
const { sign, verify } = require('../../config/auth');

module.exports = (primus, spark) => {
  spark.on('project:join', async ({ projectId, token }) => {
    try {
      const { id, username } = await verify(token);
      await GenenralStore.addUserOnProject(projectId, { id, username, socket: spark.id });

      spark.emit('project:userJoined', { username });

    } catch (err) {
      console.log(err);
    }
  });

  spark.on('project:leave', async data => {

    spark.emit('project:userLeft');
  });

  spark.on('cix:startup', async data => {

  });

  spark.on('cix:status', async data => {

  });

  spark.on('end', async () => {
    //Remove the spark from all files and projects

  });
}