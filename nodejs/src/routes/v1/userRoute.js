import express from 'express';
import { userController } from '../../controllers/userController.js';
import { userValidation } from '../../validations/userValidation.js';
import { userAuth } from '../../middlewares/auth.js';

const Router = express.Router();

Router.route('/').post(userAuth, userController.getList);
Router.route('/detail/:id').get(userAuth, userController.getDetail);
Router.route('/delete/:id').delete(userAuth, userController.deleteItem);
Router.route('/update/:id').put(userAuth, userValidation.updateItem, userController.updateItem);
Router.route('/add').post(userAuth, userValidation.createNew, userController.createNew);

export const userRoute = Router;
