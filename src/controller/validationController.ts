import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Address } from '../validations/Address';
import { Register } from '../validations/Register';
import { PrismaClient } from '@prisma/client';
import { Login } from '../validations/Login';
import bcrypt = require ('bcrypt');
import { Bus } from '../validations/Bus';

const prisma = new PrismaClient();

export const validateRegistration = async (req: Request, res: Response, next: NextFunction) => {
  const register = new Register();
  register.username = req.body.username;
  register.password = req.body.password;
  register.email = req.body.email;
  register.confirmpassword = req.body.confirmpassword;

  const errors = await validate(register, { skipMissingProperties: true });
  if (errors.length > 0) {
    let errorText = Array();
    for (const errorItem of errors) {
      errorText = errorText.concat(errorItem.constraints);
    }
    return res.status(400).json(errorText);
  }
  next();

};
export const validateAddress = async (req: Request, res: Response, next: NextFunction) => {
  const address = new Address();
  address.city = req.body.city;
  address.county = req.body.county;

  const errors = await validate(address, { skipMissingProperties: true });
  if (errors.length > 0) {
    let errorText = Array();
    for (const errorItem of errors) {
      errorText = errorText.concat(errorItem.constraints);
    }
    return res.status(400).json(errorText);
  }
  next();

};

export const checkIfEmailExists = async (req: Request, res: Response, next: NextFunction) => {
  await prisma.user.findOne({ where:{ email:req.body.email } })
  .then((exists) => {
    if (exists) {
      return res.status(400).json({ email:'Email Already exists' });
    }
    if (!exists) {
      next();
    }

  }).catch((err) => {
    return res.status(500).json({ message: err });
  });

};

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const login = new Login();
  login.email = req.body.email;
  login.password = req.body.password;

  const errors = await validate(login, { skipMissingProperties: true });
  if (errors.length > 0) {
    let errorText = Array();
    for (const errorItem of errors) {
      errorText = errorText.concat(errorItem.constraints);
    }
    return res.status(400).json(errorText);
  }
  next();

};

export const checkEmailAndPassword = async (req: Request, res: Response, next: NextFunction) => {
  await prisma.user.findOne({ where: { email: req.body.email } })
     .then((found) => {
       if (!found) {
         return res.status(404).send({ email: 'Email does not exist' });
       }

        // tslint:disable-next-line: no-floating-promises
       bcrypt.compare(req.body.password, found.password, (err , same) => {
         if (!same) {
           return res.status(403).send({ password: 'Passwords Do not Match' });

         }
         next();

       });
     })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
  });
};
export const validateBusCredentials = async (req: Request, res: Response, next: NextFunction) => {
  const bus = new Bus();
  bus.plates = req.body.plates;
  bus.routes = req.body.routes;
  bus.departureTime = req.body.departureTime;
  bus.arrivalTime = req.body.arrivalTime;
  bus.price = req.body.price;

  const errors = await validate(bus, { skipMissingProperties: true });
  if (errors.length > 0) {
    let errorText = Array();
    for (const errorItem of errors) {
      errorText = errorText.concat(errorItem.constraints);
    }
    return res.status(400).json(errorText);
  }
  next();

};

export const checkIfBusExists = async (req: Request, res: Response, next: NextFunction) => {
  await prisma.bus.findOne({
    where: {
      plates:req.body.plates,
    },
  })
    .then((result) => {
      if (result) {
        return res.status(403).json({plates: 'Bus Already exists' });
      }
      next();

    }).catch((err) => {
      return res.status(500).json({ plates: err });
    });

};
