const redis = require('redis');
const {promisify} = require('util')
const client = redis.createClient({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT,
    auth_pass : process.env.REDIS_PASSWORD
});

client.on('error', err => {
    console.log('Error ' + err);
});
//Create Callback to a promise
exports.getAsync = promisify(client.get).bind(client);
exports.setAsync = promisify(client.set).bind(client);
exports.settextAsync = promisify(client.setex).bind(client);
exports.ttlAsync = promisify(client.ttl).bind(client);

