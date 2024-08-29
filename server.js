const app = require('fastify')({
  logger: true,
  disableRequestLogging: false,
  trustProxy: true // Enable trust proxy
});
const proxy = require('./src/proxy');

const PORT = process.env.PORT || 3000;

// Set up the route
app.get('/', async (request, reply) => {
  return processRequest(request, reply);
});

// Start the server
const start = async () => {
  try {
    await app.listen({ host: '0.0.0.0', port: PORT });
    console.log(`Listening on ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
