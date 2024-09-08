import express from 'express';
import familyController from '../../../controllers/familyController.js';

const Router = express.Router();

Router.get('/view/:id', familyController.getView);

export const familyWebRoute = Router;
