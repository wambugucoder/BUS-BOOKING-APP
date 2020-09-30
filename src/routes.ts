import * as express from 'express';
import { registerUser } from './controller/AuthController';
import { checkIfEmailExists, validateAddress, validateRegistration } from './controller/validationController';

const router = express.Router();

// USER ROUTES

/*
Stage 1 - validate core details,
Stage 2 - validate address fields,
Stage 3 - check if email exists
Stage 4  - if stage 1 ,2 & 3 ===success =>encrypt password and register user
 */
router.post('/register', validateRegistration, validateAddress , checkIfEmailExists, registerUser);

export default router;
