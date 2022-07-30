import { RedisOptions } from 'ioredis';

interface IRedisConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default <IRedisConfig>{
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || undefined,
    },
  },
  driver: 'redis',
};

// or;
// export default {
//   config: {
//     redis: {
//       host: process.env.REDIS_HOST,
//       port: process.env.REDIS_PORT,
//       password: process.env.REDIS_PASS || undefined,
//     },
//   },
//   driver: 'redis',
// } as IRedisConfig;
