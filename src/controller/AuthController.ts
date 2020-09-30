import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt = require ('bcrypt');

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const password = req.body.password;
  await bcrypt.genSalt(10, (error, salt) => {
    if (error) throw error;
    // tslint:disable-next-line: no-floating-promises
    bcrypt.hash(password, salt, (err, encrypted) => {
      if (err) throw err;
      prisma.user.create({
        data: {
          username: req.body.username,
          password:`${encrypted}`,
          email: req.body.email,
          address:{
            create: {
              city:req.body.city,
              county:req.body.county,
            },
          },
        },
      })
          .then((register) => {
            if (register) {
              return res.status(200).json(register);
            }
            return res.status(400).json({ message:'Please check your inputs again' });
          })
              .catch((err) => {
                return res.status(500).json(err);
              });
    });

  });

};
