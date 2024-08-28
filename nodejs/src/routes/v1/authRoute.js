import express from 'express';
import { authValidation } from '../..//validations/authValidation.js';
import { authController } from '../../controllers/authController.js';
import { userAuth } from '../../middlewares/auth.js';
import { StatusCodes } from 'http-status-codes';

const Router = express.Router();

Router.route('/register').post(authValidation.register, authController.register);
Router.route('/login').post(authValidation.login, authController.login);
Router.route('/checkAuth').get(userAuth, (req, res) =>
  res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, message: 'Xác thực thành công!' })
);

export const authRoute = Router;
