import express from 'express';
import { validateLogin, validateRegistration } from '../controller/authController.js';
import { login, register } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/register', validateRegistration, register);
authRouter.post('/login', validateLogin, login);

export default authRouter;
