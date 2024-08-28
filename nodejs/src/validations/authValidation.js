import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { regexPassword } from '../config/regex.js';

const register = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    active: Joi.boolean().default(true),
    password: Joi.string().pattern(new RegExp(regexPassword))
  });
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp(regexPassword))
  });
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

export const authValidation = {
  register,
  login
};
