import Joi from 'joi';
import { GET_DB } from '../config/mongodb.js';
import { regexPassword } from '../config/regex.js';

const ACCOUNT_COLLECTION_NAME = 'account';
const ACCOUNT_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  active: Joi.boolean().default(true),
  password: Joi.string().pattern(new RegExp(regexPassword)),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
});

const validationBeforeCreate = async data => {
  return await ACCOUNT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const register = async data => {
  try {
    const validData = await validationBeforeCreate(data);
    const createdAccount = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).insertOne(validData);
    return createdAccount;
  } catch (error) {
    throw new Error(error);
  }
};

const findOne = async username => {
  try {
    const result = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).findOne({ username });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const account = {
  register,
  findOne
};

export default account;
