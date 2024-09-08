const Joi = require('joi');
const { regexPassword } = require('../config/regex');

export const USER_COLLECTION_NAME = 'account';

export const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  status: Joi.boolean().required(),
  password: Joi.string().pattern(new RegExp(regexPassword)),
  repeatPassword: Joi.ref('password'),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
}).with('password', 'repeatPassword');

export const USER_UPDATE_SCHEMA = Joi.object({
  username: Joi.string().min(3).max(30),
  level: Joi.number().min(1).max(7),
  status: Joi.boolean(),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now),
  _destroy: Joi.boolean().default(false)
});
