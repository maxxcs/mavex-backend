const UserModel = require('../models/user');
const { sign, verify } = require('../config/auth');

const home = async (fast, opts, done) => {
  fast.get('/', async (request, reply) => {
    try {
      reply.type('application/json');
      return { controller: 'home', location: 'index' };

    } catch (err) {
      console.error(err);
      return err;
    }
  });

  fast.post('/login', async (request, reply) => {
    try {
      reply.type('application/json');
      const user = await UserModel.findOne({ username: request.body.username }).select('+password');

      if (!user) {
        throw new Error('Username or password is invalid.');
      } else {
        if (!await user.comparePassword(request.body.password)) {
          throw new Error('Username or password is invalid.');
        } else {
          const token = await sign({
            id: user.id,
            username: user.username,
            email: user.email,
            permission: user.level
          });
          return { token };
        }
      }

    } catch (err) {
      reply.code(400);
      console.error(err.message);
      return { message: err.message };
    }
  });

  fast.post('/register', async (request, reply) => {
    try {
      reply.type('application/json');

      const user = await UserModel.create({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
      });

      if (!user)
        return { registered: false };
      else
        return { registered: true };

    } catch (err) {
      reply.code(400);
      console.error(err.message);
      return { message: err.message };
    }
  });

  done();
}

module.exports = home;
