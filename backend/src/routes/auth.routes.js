import { Router } from 'express';
import {
  signInCtrl,
  signOutCtrl,
  validateSessionCtrl,
  signUpCtrl,
} from '../controllers/auth.controllers.js';
import validarJwt from '../middlewares/validar-jwt.js';

const authRouter = Router();

// Endpoint de inicio de sesión (login)
authRouter.post('/sign-in', signInCtrl);

// Endpoint de cierre de sesión (logout)
authRouter.post('/sign-out', signOutCtrl);

// Endpoint de registro (sign-up)
authRouter.post('/sign-up', signUpCtrl);

// Endpoint para validar la sesión
authRouter.get('/session', validarJwt, validateSessionCtrl);

export { authRouter };