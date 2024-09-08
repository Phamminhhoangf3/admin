const moment = require('moment');
const { ObjectId } = require('mongodb');
const { GET_DB } = require('../config/mongodb');
const { MEMBER_COLLECTION_NAME } = require('./memberModel');
const { convertObjectId } = require('../utils/convert');
const {
  FAMILY_COLLECTION_CREATE_SCHEMA,
  FAMILY_COLLECTION_UPDATE_SCHEMA,
  FAMILY_COLLECTION_NAME
} = require('../schemas/familySchema');

const validationBeforeCreate = async data => {
  return await FAMILY_COLLECTION_CREATE_SCHEMA.validateAsync(data, { abortEarly: false });
};

const validationBeforeUpdate = async data => {
  return await FAMILY_COLLECTION_UPDATE_SCHEMA.validateAsync(data, { abortEarly: false });
};

const findOneById = async id =>
  await GET_DB()
    .collection(FAMILY_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });

const Family = function (family) {
  this.type = family.type;
  this.husbandId = family.husbandId;
  this.wifeId = family.wifeId;
  this.exWifeId = family.exWifeId;
  this.childrenIds = family.childrenIds;
  this.status = family.status;
};

Family.create = async (family, result) => {
  try {
    const familyValid = await validationBeforeCreate(family);
    if (!familyValid) {
      throw new Error('Dữ liệu không hợp lệ!');
    }

    const fieldsToConvert = ['husbandId', 'wifeId', 'exWifeId', 'childrenIds'];
    const familyInserted = await GET_DB()
      .collection(FAMILY_COLLECTION_NAME)
      .insertOne(convertObjectId(familyValid, fieldsToConvert));
    const familyCreated = await findOneById(familyInserted.insertedId);

    result(null, familyCreated);
  } catch (error) {
    result(error, null);
  }
};

Family.findOneById = async (id, result) => {
  try {
    const family = await GET_DB()
      .collection(FAMILY_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false
          }
        },
        { $project: { _destroy: 0 } }
      ])
      .next();
    result(null, family);
  } catch (error) {
    result(error, null);
  }
};

const handleFilterToQuery = filters => {
  const query = {
    _destroy: false
  };
  Object.keys(filters).forEach(key => {
    switch (key) {
      case 'keywords':
        query['husband.name'] = { $regex: filters.keywords, $options: 'i' };
        break;
      case 'fromDate':
        query.createdAt = {};
        query.createdAt.$gte = moment.utc(filters.fromDate).toDate();
        break;
      case 'toDate':
        query.createdAt.$lte = moment.utc(filters.toDate).toDate();
        break;
      default:
        query[key] = filters[key];
        break;
    }
  });
  return query;
};

Family.findAll = async (filters, result) => {
  try {
    const query = handleFilterToQuery(filters);
    const res = await GET_DB()
      .collection(FAMILY_COLLECTION_NAME)
      .aggregate([
        {
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'husbandId',
            foreignField: '_id',
            as: 'husband',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        {
          $addFields: {
            husband: {
              $cond: {
                if: { $isArray: ['$husband'] },
                then: { $arrayElemAt: ['$husband', 0] },
                else: null
              }
            }
          }
        },
        {
          $match: query
        }
      ])
      .toArray();
    result(null, res);
  } catch (error) {
    result(error, null);
  }
};

Family.update = async (id, familyUpdate, result) => {
  try {
    const familyValid = await validationBeforeUpdate(familyUpdate);
    if (!familyValid) {
      throw new Error('Dữ liệu không hợp lệ!');
    }

    const fieldsToConvert = ['husbandId', 'wifeId', 'exWifeId', 'childrenIds'];
    const data = await GET_DB()
      .collection(FAMILY_COLLECTION_NAME)
      .updateOne(
        {
          _id: new ObjectId(id),
          _destroy: false
        },
        {
          $set: convertObjectId(familyValid, fieldsToConvert)
        }
      );
    if (data.matchedCount === 0) {
      throw new Error('No documents matches the provided id');
    } else {
      const familyUpdated = await findOneById(id);
      result(null, familyUpdated);
    }
  } catch (error) {
    result(error, null);
  }
};

Family.delete = async (id, result) => {
  try {
    const data = await GET_DB()
      .collection(FAMILY_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(id)
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
    result(null, data);
  } catch (error) {
    result(error, null);
  }
};

module.exports = Family;
