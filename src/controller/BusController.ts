import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const registerBus = async (req: Request, res: Response) => {
  await prisma.bus.create({
    data: {
      plates: req.body.plates,
      routes: req.body.routes,
      departureTime: req.body.departureTime,
      arrivalTime:req.body.arrivalTime,
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(400).json({ bus: 'Check your details again' });
      }
      return res.status(200).json(result);

    }).catch((err) => {
      return res.status(200).json({ message: err });

    });

};
