import Joi from 'joi';
import moment from 'moment';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';
import { regexPassword } from '~/config/regex';

const USER_COLLECTION_NAME = 'users';
const USER_COLLECTION_SCHEMA = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  level: Joi.number().min(1).max(7).required(),
  active: Joi.boolean().required(),
  password: Joi.string().pattern(new RegExp(regexPassword)),
  repeatPassword: Joi.ref('password'),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
}).with('password', 'repeatPassword');

const USER_UPDATE_SCHEMA = Joi.object({
  userName: Joi.string().min(3).max(30),
  level: Joi.number().min(1).max(7),
  active: Joi.boolean(),
  password: Joi.string().pattern(new RegExp(regexPassword)),
  repeatPassword: Joi.ref('password'),
  updatedAt: Joi.date().timestamp('javascript').default(Date.now),
  _destroy: Joi.boolean().default(false)
}).with('password', 'repeatPassword');

const validationBeforeCreate = async data => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const validationBeforeUpdate = async data => {
  return await USER_UPDATE_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async data => {
  try {
    const validData = await validationBeforeCreate(data);
    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData);
    return createdUser;
  } catch (error) {
    throw new Error(error);
  }
};

const updateItem = async (id, data) => {
  try {
    const validData = await validationBeforeUpdate(data);
    delete validData.createdAt;
    delete validData._id;
    validData.updatedAt = Date.now();
    const objectId = new ObjectId(id);
    const result = await GET_DB().collection(USER_COLLECTION_NAME).updateOne(
      {
        _id: objectId,
        _destroy: false
      },
      {
        $set: validData
      }
    );
    if (result.matchedCount === 0) {
      throw new Error('No documents matches the provided id');
    }
    return await findOneById(objectId);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async userId => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(userId)
      });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async userId => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne(
        {
          _id: new ObjectId(userId),
          _destroy: false
        },
        {
          projection: { password: 0, repeatPassword: 0, _destroy: 0 }
        }
      );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getAll = async (filters = {}) => {
  try {
    const query = { _destroy: false };
    if (filters.keywords) query.userName = { $regex: filters.keywords, $options: 'i' };
    if (filters.status !== undefined) query.active = filters.status;
    if (filters.fromDate && filters.toDate) {
      query.createdAt = {};
      if (filters.fromDate)
        query.createdAt.$gte = moment(filters.fromDate).startOf('day').valueOf();
      if (filters.toDate) query.createdAt.$lte = moment(filters.toDate).endOf('day').valueOf();
    }
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .find(query, {
        projection: { password: 0, repeatPassword: 0, _destroy: 0 }
      })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteItem = async userId => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(userId)
        },
        {
          $set: {
            _destroy: true
          }
        },
        {
          returnOriginal: false
        }
      );
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getAll,
  deleteItem,
  getDetail,
  updateItem
};
