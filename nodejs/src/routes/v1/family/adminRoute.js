import express from 'express';
import familyController from '../../../controllers/familyController.js';
import familyValidation from '../../../validations/familyValidation.js';

const Router = express.Router();

Router.post('/', familyController.getList);
Router.post('/add', familyValidation.createNew, familyController.createNew);
Router.put('/update/:id', familyValidation.updateItem, familyController.updateItem);
Router.get('/detail/:id', familyController.getDetail);
Router.delete('/delete/:id', familyController.deleteItem);

export const familyAdminRoute = Router;
