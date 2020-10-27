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

export const getUserById = async (req: Request, res: Response) => {
  await prisma.user.findOne({
    where: {
      id:parseInt(req.params.id, 10),
    },
    include: {
      address: {
        select: {
          id:true,
          county: true,
          city:true,

        },
      },

    },
  })
  .then(async(data) => {
    await setCache(req.route.path, data);
    return res.status(200).json(data);
  })

    .catch((err) => {
      return res.status(500).json({ message: err });
    });

};

export const updateProfile = async (req: Request, res: Response) => {
  const userid: number = parseInt(req.params.id, 10);
  await prisma.address.update({
    where: {
      userId:userid,
    },
    data: {

      county:req.body.county,
      city:req.body.city,

    },

  })

  .then((data) => {
    return res.status(200).json({ message:'User Data updated successfully' });
  })

    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

export const deleteAccount = async (req: Request, res: Response) => {
  const userid: number = parseInt(req.params.id, 10);
  await prisma.user.delete({
    where: {
      id:userid,
    },
  })
  .then((data) => {
    return res.status(200).json({ message:'Account Deleted successfully' });
  })

    .catch((err) => {

      return res.status(500).json({ message: err });
    });

};
