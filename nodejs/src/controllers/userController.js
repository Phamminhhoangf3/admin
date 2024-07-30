import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    const createdUser = await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdUser)
  } catch (error) {
    next(error)
  }
}

const getList = async (req, res, next) => {
  try {
    const filters = req.body
    const getListUser = await userService.getList(filters)
    res.status(StatusCodes.OK).json(getListUser)
  } catch (error) {
    next(error)
  }
}

export const userController = { createNew, getList }
