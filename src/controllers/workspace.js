const workspace = async (fast, opts, done) => {
  fast.get('/:projectId', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'workspace', location: 'index' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  fast.get('/:projectId/file/:fileId', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'workspace', location: 'file' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  done();
}

module.exports = workspace;
