/* eslint-disable no-console */
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError';
import { GENDER_MEMBER } from '../utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators';

const correctCondition = Joi.object({
  gender: Joi.string().required().valid(GENDER_MEMBER.FEMALE, GENDER_MEMBER.MALE).trim().strict(),
  name: Joi.string().required().min(2).max(25).trim().strict(),
  image: Joi.string().required().trim().strict(),
  status: Joi.boolean().required().strict(),
  fromDob: Joi.string().required(),
  toDob: Joi.string().required(),
  familyId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null)
});

const createNew = async (req, res, next) => {
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const updateItem = async (req, res, next) => {
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message));
  }
};

const memberValidation = {
  createNew,
  updateItem
};

export default memberValidation;
