import express, { Router } from 'express';
import authController from '../controllers/auth.controller';

const authRouter: Router = express.Router();

authRouter.route('/signup').post(authController.signup);

export default authRouter;
