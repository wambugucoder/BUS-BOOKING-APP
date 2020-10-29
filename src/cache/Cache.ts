import redis from 'redis';
import { NextFunction, Request, Response } from 'express';

const redisport: string = process.env.PORT_REDIS!;

const opts: redis.ClientOpts = {
  host: '172.17.0.1',
  port: parseInt(redisport, 10),

};
const redisClient = redis.createClient(opts);

export const setCache = async (key: any, value: any) => {
  redisClient.set(key, JSON.stringify(value), 'EX', 5);

};

export const getCache = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.route.path;
  redisClient.get(key, (err, reply) => {
    if (err) {
      res.status(400).send(err);
    }
    if (reply !== null) {
      return res.status(200).send(JSON.parse(reply));
    }
    next();
  });
};
