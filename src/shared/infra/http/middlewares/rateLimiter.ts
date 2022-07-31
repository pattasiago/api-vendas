import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import cacheConfig from '@config/cache';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const redisClient = new Redis(cacheConfig.config.redis);

    const opts = {
      storeClient: redisClient, // 6 points
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1, // Per second
    };

    const limiter = new RateLimiterRedis(opts);
    await limiter.consume(request.ip);
    return next();
  } catch {
    throw new AppError('Too Many Requests', 429);
  }
}
