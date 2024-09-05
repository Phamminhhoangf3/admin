import express from 'express';
import memberController from '../../../controllers/memberController';
// import memberValidation from '../../../validations/memberValidation';

const Router = express.Router();
Router.post('/', memberController.getList);
// Router.post('/create', memberValidation.createNew, memberController.createNew);

// app.use('/api/members', Router);
export const memberWebRoute = Router;
