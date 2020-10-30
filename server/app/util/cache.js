const redis = require('redis');
const {promisify} = require('util')
const client = redis.createClient(process.env.REDIS_URL);

//Create Callback to a promise
exports.getAsync = promisify(client.get).bind(client);
exports.setAsync = promisify(client.set).bind(client);
exports.settextAsync = promisify(client.setex).bind(client);
exports.ttlAsync = promisify(client.ttl).bind(client);

