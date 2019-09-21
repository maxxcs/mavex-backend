const home = async (fast, opts, done) => {
  fast.get('/', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'home', location: 'index' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  fast.post('/login', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'home', location: 'login' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  fast.post('/register', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'home', location: 'register' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  fast.post('/logout', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'home', location: 'logout' };

    } catch (err) {
      reply.type('application/json');
      console.log(err);
      return err;
    }
  });

  done();
}

module.exports = home;
