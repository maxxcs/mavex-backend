const UserModel = require('../models/user');

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
      console.log(request.body);
      const user = await UserModel.findOne({ username: request.body.username }).select('+password');
      if (!user) {
        throw new Error('Username or password is invalid.');
      } else {
        if (!await user.comparePassword(request.body.password)) {
          throw new Error('Username or password is invalid.');
        } else {
          user.password = undefined;
          return user;
        }
      }

    } catch (err) {
      reply.type('application/json');
      reply.code(400);
      console.log(err.message);
      return { message: err.message };
    }
  });

  fast.post('/register', async (request, reply) => {
    try {
      reply.type('application/json');
      console.log(request.body);
      const user = await UserModel.create({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
      });
      console.log(user);
      if (!user)
        return { registered: false };
      else
        return { registered: true };

    } catch (err) {
      reply.type('application/json');
      reply.code(400);
      console.log(err.message);
      return { message: err.message };
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
