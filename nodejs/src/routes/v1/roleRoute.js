import express from 'express'
import { roleController } from '~/controllers/roleController'
import { roleValidation } from '~/validations/roleValidation'

const Router = express.Router()

Router.route('/').post(roleValidation.createNew, roleController.createNew)

export const roleRoute = Router
