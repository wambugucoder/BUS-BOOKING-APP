import passport from 'passport';
import passportJwt from 'passport-jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const jwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts: passportJwt.StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY!,

};

passport.use(new jwtStrategy(opts, (payload, done) => {
  prisma.user.findOne({ where: { email: payload.email } })
    .then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);

    }).catch((err) => {
      if (err) {
        return done(err, false);
      }

    });
}));

export default passport;
