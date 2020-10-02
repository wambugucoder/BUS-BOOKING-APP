import * as express from 'express';
import { loginUser, registerUser } from './controller/AuthController';
import {
  checkEmailAndPassword, checkIfEmailExists, validateAddress,
  validateLogin, validateRegistration} from './controller/validationController';

const router = express.Router();

// USER ROUTES

/*
Stage 1 - validate core details,
Stage 2 - validate address fields,
Stage 3 - check if email exists
Stage 4  - if stage 1 ,2 & 3 ===success =>encrypt password and register user
 */
router.post('/register', validateRegistration, validateAddress, checkIfEmailExists, registerUser);
/*
Stage 1 - validate core details,
Stage 2 - check Email and Password,
Stage 3  - if stage 1 ,2  ===success =>generate token that lasts for one hour
 */
router.post('/login', validateLogin, checkEmailAndPassword, loginUser);

export default router;
