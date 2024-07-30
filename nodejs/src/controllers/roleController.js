import { StatusCodes } from 'http-status-codes'
import { roleService } from '~/services/roleService'

const createNew = async (req, res, next) => {
  try {
    const createColumn = await roleService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) {
    next(error)
  }
}

export const roleController = {
  createNew
}
