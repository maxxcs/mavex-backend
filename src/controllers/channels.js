const channels = async (fast, opts, done) => {
  fast.get('/:projectId', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'channels', location: 'index' };

    } catch (err) {
      console.error(err);
      return err;
    }
  });

  fast.get('/:projectId/ch/:channelId', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'channels', location: 'env' };

    } catch (err) {
      console.error(err);
      return err;
    }
  });

  done();
}

module.exports = channels;
