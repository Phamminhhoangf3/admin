import express from 'express';
import familyController from '../../../controllers/familyController.js';
import familyValidation from '../../../validations/familyValidation.js';

const Router = express.Router();

Router.post('/', familyController.getList);
Router.post('/add', familyValidation.createNew, familyController.createNew);

export const familyAdminRoute = Router;
