import { StatusCodes } from 'http-status-codes';
import { userService } from '../services/userService.js';

const createNew = async (req, res, next) => {
  try {
    const createdUser = await userService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    const filters = req.body;
    const getListUser = await userService.getList(filters);
    res.status(StatusCodes.OK).json(getListUser);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await userService.deleteItem(id);
    res.status(StatusCodes.OK).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const values = req.body;
    const id = req.params.id;
    const updatedUser = await userService.updateItem(id, values);
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const getDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    const detailUser = await userService.getDetail(id);
    res.status(StatusCodes.OK).json(detailUser);
  } catch (error) {
    next(error);
  }
};

export const userController = { createNew, getList, deleteItem, getDetail, updateItem };
