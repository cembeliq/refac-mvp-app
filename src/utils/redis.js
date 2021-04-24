require('dotenv').config(); // this is important!

// const redis = require('redis');
// const { promisifyAll } = require('bluebird');

// promisifyAll(redis);

// const client = async () => {
//   const client = redis.createClient({
//     host: process.env.DEV_REDIS_HOST,
//     port: process.env.DEV_REDIS_PORT,
//     password: process.env.DEV_REDIS_PASSWORD,
//   });
// };

// client.on('error', (err) => {
//   console.log(`Error: ${err}`);
// });

// module.exports = { client };

const redis = require('redis');
const { promisify } = require('util');
// const config = require('./config')
const redisClient = redis.createClient(
  {
    host: process.env.DEV_REDIS_HOST,
    port: process.env.DEV_REDIS_PORT,
    password: process.env.DEV_REDIS_PASSWORD,
  },
);
// const password = config.redis_password || null;
// if (password && password != 'null') {
//   redisClient.auth(password, (err, res) => {
//     console.log('res', res);
//     console.log('err', err);
//   });
// }
try {
  redisClient.getAsync = promisify(redisClient.get).bind(redisClient);
  redisClient.setAsync = promisify(redisClient.set).bind(redisClient);
  redisClient.lpushAsync = promisify(redisClient.lpush).bind(redisClient);
  redisClient.lrangeAsync = promisify(redisClient.lrange).bind(redisClient);
  redisClient.llenAsync = promisify(redisClient.llen).bind(redisClient);
  redisClient.lremAsync = promisify(redisClient.lrem).bind(redisClient);
  redisClient.lsetAsync = promisify(redisClient.lset).bind(redisClient);
  redisClient.hmsetAsync = promisify(redisClient.hmset).bind(redisClient);
  redisClient.hmgetAsync = promisify(redisClient.hmget).bind(redisClient);
  redisClient.clear = promisify(redisClient.del).bind(redisClient);
} catch (e) {
  console.log('redis error', e);
}

redisClient.on('connected', () => {
  console.log('Redis is connected');
});
redisClient.on('error', (err) => {
  console.log('Redis error.', err);
});
setInterval(() => {
  console.log('Keeping alive - Node.js Performance Test with Redis');
  redisClient.set('ping', 'pong');
}, 1000 * 60 * 4);

global.cache = redisClient;
module.exports = redisClient;
