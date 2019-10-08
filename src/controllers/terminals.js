const terminals = async (fast, opts, done) => {
  fast.get('/:projectId', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'terminals', location: 'index' };

    } catch (err) {
      console.error(err);
      return err;
    }
  });

  fast.get('/:projectId/env/:terminalId', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'terminals', location: 'env' };

    } catch (err) {
      console.error(err);
      return err;
    }
  });

  done();
}

module.exports = terminals;