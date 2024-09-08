import moment from 'moment';
import { ObjectId } from 'mongodb';
import { GET_DB } from '../config/mongodb.js';
import {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  USER_UPDATE_SCHEMA
} from '../schemas/userSchema.js';

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
    delete validData.password;
    delete validData.repeatPassword;
    validData.updatedAt = Date.now();
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(id),
          _destroy: false
        },
        {
          $set: validData
        }
      );
    if (result.matchedCount === 0) {
      throw new Error('No documents matches the provided id');
    }
    return await findOneById(id);
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

const getUser = async info => {
  try {
    const result = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne(
        {
          username: info.username,
          password: info.password,
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
    if (filters.keywords) query.username = { $regex: filters.keywords, $options: 'i' };
    if (filters.status !== undefined) query.status = filters.status;
    if (filters.fromDate && filters.toDate) {
      query.createdAt = {
        $gte: moment(filters.fromDate).valueOf(),
        $lte: moment(filters.toDate).valueOf()
      };
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
    return result;
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
  getUser,
  deleteItem,
  getDetail,
  updateItem
};
