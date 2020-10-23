import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import paypalRestSdk from 'paypal-rest-sdk';

const prisma = new PrismaClient();

paypalRestSdk.configure({
  mode: process.env.PAYPAL_MODE!,
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_SECRET!,

});

export const checkIfUserBookedAlready = async (req: Request, res: Response, next: NextFunction) => {
  const uid = parseInt(req.params.uid, 10);
  await prisma.user.findOne({
    where: {
      id: uid,
    },
  })
    .then((result) => {
      if (result?.booked === false) {
        next();
      }
      if (result?.booked === true) {
        return res.status(403).json({ transaction: 'You seemed to have already booked a Bus' });
      }
    }).catch((err) => {
      return res.status(500).json({ message: err });
    });
};

export const checkIfThereIsSpace = async (req: Request, res: Response, next: NextFunction) => {
  const bid = parseInt(req.params.bid, 10);

  await prisma.bus.findOne({
    where: {
      id:bid,
    },
    include: {
      passengers:true,
    },
  })
    .then((result) => {
      if (result!.passengers.length < 50) {
        next();
      }
      if (result!.passengers.length === 50) {
        return res.status(423).json({ transaction: 'This Bus is already full' });
      }

    }).catch((err) => {
      return res.status(500).json({ message: err });
    });
};

export const proceedToPayment = async (req: Request, res: Response, next: NextFunction) => {
  const bid = parseInt(req.params.bid, 10);
  const uid = parseInt(req.params.uid, 10);
  await prisma.bus.findOne({
    where:{
      id:bid,
    },
  })
    .then((result) => {
      const pay: paypalRestSdk.Payment = {
        intent: 'sale',
        payer: {
          payment_method: 'paypal',
        },
        redirect_urls: {
          return_url: `http://localhost:5000/api/v1/success/${uid}/${bid}`,
          cancel_url: `http://localhost:5000/api/v1/cancel//${uid}/${bid}`,
        },
        transactions: [{
          item_list: {
            items: [{
              name: result!.plates,
              sku:  result!.plates,
              price:result!.price.toString(),
              currency: 'USD',
              quantity: 1,
            }],
          },
          amount: {
            currency: 'USD',
            total: result!.price.toString(),
          },
          description: 'Bus Ticket ',
        }],
      };
      paypalRestSdk.payment.create(pay, (error, payment) => {
        if (error) {
          return res.status(400).json({ transaction: error });

        }
        if (payment) {
          for (const element of payment.links!) {
            if (element.rel === 'approval_url') {
             res.redirect(element.href);
            }

          }
        }
      });

    }).catch((err) => {
      return res.status(500).json({ message: err });
    });
};
export const getSuccess = async (req: Request, res: Response, next: NextFunction) => {

  const payerId = req.query.PayerID as string;
  const paymentId = req.query.paymentId as string;

  const execute: paypalRestSdk.payment.ExecuteRequest = {
    payer_id: payerId ,

  };

  paypalRestSdk.payment.execute(paymentId , execute, (error, payment) => {
    if (error) {
      return res.status(400).json({ transaction: error });

    }
    if (payment) {

      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < payment.transactions.length; i++) {
        if (payment.state === 'approved') {
          const total = payment.transactions[i].amount.total;
          prisma.transaction.create({
            data: {
              cart:payment.id!,
              status: payment.state,
              amount: parseInt(total, 10),
              createdAt:new Date(payment.create_time!),
              updatedAt: new Date(payment.update_time!),
              user: {
                connect:{
                  id:parseInt(req.params.uid, 10),
                },
              },

            },
          })
          .then((result) => {
            next();
          }).catch((err) => {
            return res.status(500).json({ transaction:err });
          });
        }

      }

    }

  });
};

export const bookUser = async (req: Request, res: Response, next: NextFunction) => {
  const bid = parseInt(req.params.bid, 10);
  const uid = parseInt(req.params.uid, 10);
  await prisma.user.update({
    where: {
      id:uid,
    },
    data: {
      booked: true,
      busBooked:{
        connect:{
          id:bid,
        },
      },
    },
  })
  .then((result) => {
    next();
  }).catch((err) => {
    return res.status(500).json({ transaction:err });
  });
};

export const cancelPayment = async (req: Request, res: Response, next: NextFunction) => {
  res.redirect(400, 'http://localhost:3000/cancel');
};
