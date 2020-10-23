import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import bcrypt = require ('bcrypt');
import jsonwebtoken from 'jsonwebtoken';

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

            return res.status(201).json(register);

          })
              .catch((err) => {
                return res.status(500).json(err);
              });
    });

  });

};

export const loginUser = async (req: Request, res: Response) => {
  await prisma.user.findOne({ where: { email: req.body.email } })
    .then((found) => {
      const payload = {
        email: found?.email,
        role: found?.role,
        username:found?.username,

      };
      const expires: number = 3600;

      jsonwebtoken.sign(
        payload, process.env.SECRET_OR_KEY!,
        { expiresIn: expires }, (err, encoded) => {
          if (encoded) {
            res.status(200).json({
              token:`${encoded}`,
            });
          }
          if (err) {
            return res.status(400).json({ message: 'Client Side Error' });
          }
        

        },

      );

    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};
