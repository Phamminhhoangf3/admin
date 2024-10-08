import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { regexPassword } from '../config/regex.js';
import ApiError from '../utils/ApiError.js';

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    status: Joi.boolean().required(),
    password: Joi.string().pattern(new RegExp(regexPassword)),
    repeatPassword: Joi.ref('password')
  }).with('password', 'repeatPassword');
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const updateItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(30),
    level: Joi.number().min(1).max(7),
    active: Joi.boolean(),
    password: Joi.string().pattern(new RegExp(regexPassword)),
    repeatPassword: Joi.ref('password')
  }).with('password', 'repeatPassword');
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const userValidation = {
  createNew,
  updateItem
};
