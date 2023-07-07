import { createClient } from 'redis';
import { set } from 'zod';

const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: 'redis-11637.c57.us-east-1-4.ec2.cloud.redislabs.com',
    port: 11637,
  },
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    redisClient.set('try', 'Hello welcome to Product Feedback App');
  } catch (error) {
    console.error(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
