import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { setCache } from '../cache/Cache';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  await prisma.user.findMany({
    include: {
      address: true,
    },
  })
  .then(async(json) => {
    await setCache(req.route.path, json);
    return res.status(200).json(json);
  })

    .catch((err) => {
      return res.status(500).json({ message: err });
    });

};
