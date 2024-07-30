import express from 'express';
import { userController } from '~/controllers/userController';
import { userValidation } from '~/validations/userValidation';

const Router = express.Router();

Router.route('/').post(userController.getList);
Router.route('/:id').delete(userController.deleteItem);
Router.route('/add').post(userValidation.createNew, userController.createNew);

export const userRoute = Router;
