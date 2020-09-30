import * as express from 'express';
import { registerUser } from './controller/AuthController';
import { validateAddress, validateRegistration } from './controller/validationController';

const router = express.Router();

// USER ROUTES

/*
Stage 1 - validate core details,
Stage 2 - validate address fields,
Stage 3  - if stage 1 & 2 =success =>encrypt password and register user
 */
router.post('/register', validateRegistration, validateAddress , registerUser);

export default router;
