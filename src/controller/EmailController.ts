import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import mailgen, { Content } from 'mailgen';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  debug: true, // show debug output
  logger: true, // log information in console
});

const generate = new mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'ABC BUS BOOKING',
    link: 'http://localhost:3000/',
  },
});

export const sendInvoice = async(req: Request, res: Response, next: NextFunction) => {
  await prisma.user.findOne({
    where: {
      id: parseInt(req.params.uid, 10),
    },
    include: {
      transactions: {
        orderBy: {
          updatedAt:'desc',
        },
      },
      busBooked:true,
    },
  })
    .then(async (rs) => {
      const mailBody: Content = {
        body: {
          name: rs?.username,
          intro: 'Your order has been processed successfully.',
          table: {
            data: [
              {
                id: rs?.transactions[0].cart,
                description: `Bus Ticket for ${rs?.busBooked?.plates}`,
                price: rs?.transactions[0].amount,
              },

            ],

          },
          action: {
            instructions: 'You can check the status of your order and More in your dashboard:',
            button: {
              color: '#3869D4',
              text: 'Go to App',
              link: 'http://localhost:3000/',
            },
          },
          outro: 'We thank you for your purchase.',
        },
      };
      const emailBody = generate.generate(mailBody);
      const textBody = generate.generatePlaintext(mailBody);
      const mail = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: rs?.email, // list of receivers
        subject: 'Bus Booking Invoice', // Subject line
        text: textBody, // plain text body
        html: emailBody, // html body.
      };
      transporter.sendMail(mail, (err, info) => {
        if (err) {
          return res.status(400).json({ email: err });
        }
        if (info) {
          res.redirect('http://localhost:3000/success');
        }

      });
    })
    .catch((err) => {
      return res.status(500).json({ email: err });
    });
};
