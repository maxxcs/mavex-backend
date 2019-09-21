const dashboard = async (fast, opts, done) => {
  fast.get('/', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'dashboard', location: 'index' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  fast.post('/create-project', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'dashboard', location: 'index' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  fast.post('/config-project', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'dashboard', location: 'index' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  fast.post('/remove-project', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'dashboard', location: 'index' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });


  done();
}

module.exports = dashboard;
