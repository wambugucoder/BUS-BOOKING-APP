import * as express from 'express';
import { getCache } from './cache/Cache';
import { loginUser, registerUser } from './controller/AuthController';
import {
  deleteAccount, getAllUsers,
  getUserById, updateProfile } from './controller/UserController';
import passport from 'passport';
import {
  checkEmailAndPassword, checkIfBusExists, checkIfEmailExists, validateAddress,
  validateBusCredentials,
  validateLogin, validateRegistration} from './controller/validationController';
import { getAllBuses, getBusById, registerBus } from './controller/BusController';

const router = express.Router();

// AUTH ROUTES

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

// USER ROUTES
/*
Stage 1 - Authenticate the users token
Stage 2 - if stage 1= success, retrieve data from cache if available
Stage 3 - if stage 2 = failure,retrieve data from db and store in cache
 */

router.get('/users', passport.authenticate('jwt', { session: false }), getCache, getAllUsers);
/*
Stage 1 - Authenticate the users token
Stage 2 - if stage 1= success, retrieve data from cache if available
Stage 3 - if stage 2 = failure,retrieve data from db and store in cache
 */
router.get('/users/:id', passport.authenticate('jwt', { session: false }), getCache, getUserById);
/*
Stage 1 - Authenticate the users token
Stage 2 - if stage 1= success, update users profile
*/
router.put('/users/:id', passport.authenticate('jwt', { session: false }), updateProfile);
/*
Stage 1 - Authenticate the users token
Stage 2 - if stage 1= success, delete users profile
*/
router.delete('/users/:id', passport.authenticate('jwt', { session: false }), deleteAccount);
/*
Stage 1 - Authenticate Users token
Stage 2 - Validate Bus input credentials
Stage 3  -Check if a similar bus exists
Stage 4 - if stage 3 =false, register that bus
 */
router.post('/bus', passport.authenticate('jwt', { session: false }),
            validateBusCredentials, checkIfBusExists, registerBus);
 /*
 Stage 1 - Authenticate the users token
Stage 2 - if stage 1= success, retrieve data from cache if available
Stage 3 - if stage 2 = failure,retrieve data from db and store in cache
  */
router.get('/buses', passport.authenticate('jwt', { session: false }), getCache, getAllBuses);
 /*
 Stage 1 - Authenticate the users token
Stage 2 - if stage 1= success, retrieve data from cache if available
Stage 3 - if stage 2 = failure,retrieve data from db and store in cache
  */
router.get('/bus/:id', passport.authenticate('jwt', { session: false }), getCache, getBusById);

export default router;
