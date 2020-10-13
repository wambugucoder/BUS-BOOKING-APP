import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { setCache } from '../cache/Cache';
const prisma = new PrismaClient();

export const registerBus = async (req: Request, res: Response) => {
  const bprice: number = parseInt(req.body.price, 10);
  await prisma.bus.create({
    data: {
      plates: req.body.plates,
      routes: req.body.routes,
      departureTime: req.body.departureTime,
      arrivalTime:req.body.arrivalTime,
      price: bprice,
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
export const getAllBuses = async (req: Request, res: Response) => {
  await prisma.bus.findMany()
    .then(async(result) => {
      if (!result) {
        return res.status(404).json({ Bus: 'Buses Not Found' });

      }
      await setCache(req.route.path, result);
      return res.status(200).json(result);

    }).catch((err) => {
      return res.status(500).json({ Bus: err });
    });

};

export const getBusById = async (req: Request, res: Response) => {
  const bid: number = parseInt(req.params.id, 10);

  await prisma.bus.findOne(
    {
      where: {
        id:bid,
      },
    },
  )
    .then(async(result) => {
      if (!result) {
        return res.status(404).json({ Bus: 'Buses Not Found' });

      }
      await setCache(req.route.path, result);
      return res.status(200).json(result);

    }).catch((err) => {
      return res.status(500).json({ Bus: err });
    });

};
