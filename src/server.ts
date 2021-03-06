import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import passport from 'passport';
import './auth/passport';

// tslint:disable-next-line:import-name
import userRoutes from './routes';
// tslint:disable-next-line:no-var-requires

dotenv.config();
const app: express.Application = express();

 // BODY-PARSER MIDDLEWARE
/*
* With express version =>4.16.0
* Body-parser middleware was added back under
* express.json() & express.urlencoded
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS

app.use(cors());

// HELMET
app.use(helmet());

// COMPRESSION
app.use(compression());

// ROUTES MIDDLEWARE
app.use('/api/v1', userRoutes);

// LISTENING PORT

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is listening on port ${PORT} 🔥🔥`);
});

export default app;
