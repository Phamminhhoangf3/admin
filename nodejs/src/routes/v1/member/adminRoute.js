import express from 'express';
import memberController from '../../../controllers/memberController';
import memberValidation from '../../../validations/memberValidation';

const Router = express.Router();
Router.post('/', memberController.getList);
Router.post('/add', memberValidation.createNew, memberController.createNew);
Router.put('/update/:id', memberValidation.updateItem, memberController.updateItem);
Router.route('/delete/:id').delete(memberController.deleteItem);
Router.get('/detail/:id', memberController.getDetail);

export const memberAdminRoute = Router;
