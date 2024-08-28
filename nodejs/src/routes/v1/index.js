import express from 'express';
import { userRoute } from './userRoute.js';
import { StatusCodes } from 'http-status-codes';
import { roleRoute } from './roleRoute.js';
import { authRoute } from './authRoute.js';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' });
});

Router.use('/users', userRoute);
Router.use('/roles', roleRoute);
Router.use('/auth', authRoute);

export const APIs_V1 = Router;
