const server = require('./src/config/server');

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Mavex API running at PORT ${PORT}...`);
});
