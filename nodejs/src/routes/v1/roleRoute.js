import express from 'express'
import { roleController } from '../../controllers/roleController.js'
import { roleValidation } from '../../validations/roleValidation.js'

const Router = express.Router()

Router.route('/').post(roleValidation.createNew, roleController.createNew)

export const roleRoute = Router
