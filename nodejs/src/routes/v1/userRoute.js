import express from 'express';
import { userController } from '../../controllers/userController.js';
import { userValidation } from '../../validations/userValidation.js';

const Router = express.Router();

Router.route('/').post(userController.getList);
Router.route('/detail/:id').get(userController.getDetail);
Router.route('/delete/:id').delete(userController.deleteItem);
Router.route('/update/:id').put(userValidation.updateItem, userController.updateItem);
Router.route('/add').post(userValidation.createNew, userController.createNew);

export const userRoute = Router;
