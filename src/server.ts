import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';

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

// LISTENING PORT

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is listening on port ${PORT} 🔥🔥`);
});
