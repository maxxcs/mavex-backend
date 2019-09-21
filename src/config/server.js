const fastify = require('fastify');
const path = require('path');

const mode = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'default';

const fast = fastify();
require('./primus')(fast.server);

fast.register(require('fastify-cors'));
fast.register(require('fastify-helmet'));

fast.register(require(path.resolve('./src/controllers/home')));
fast.register(require(path.resolve('./src/controllers/dashboard')), { prefix: '/dashboard' });
fast.register(require(path.resolve('./src/controllers/workspace')), { prefix: '/workspace' });
fast.register(require(path.resolve('./src/controllers/channels')), { prefix: '/channels' });
fast.register(require(path.resolve('./src/controllers/terminals')), { prefix: '/terminals' });

const listen = async (port, ip) => {
  try {
    const address = await fast.listen(port, ip);
    console.log(`[${mode.toUpperCase()}] Mavex API running on: ${address}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = { fast, listen };
