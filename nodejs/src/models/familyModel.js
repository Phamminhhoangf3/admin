const moment = require('moment');
const { ObjectId } = require('mongodb');
const { GET_DB } = require('../config/mongodb');
const { MEMBER_COLLECTION_NAME } = require('./memberModel');

const FAMILY_COLLECTION_NAME = 'families';
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
};

Family.create = async (familyNew, result) => {
  try {
    const validDataToAdd = { ...familyNew };
    if (familyNew.husbandId) validDataToAdd.husbandId = new ObjectId(familyNew.husbandId);
    if (familyNew.wifeId) validDataToAdd.wifeId = new ObjectId(familyNew.wifeId);
    if (familyNew.exWifeId) validDataToAdd.exWifeId = new ObjectId(familyNew.exWifeId);
    if (familyNew.childrenIds.length) validDataToAdd.childrenIds.map(child => new ObjectId(child));
    const familyInserted = await GET_DB()
      .collection(FAMILY_COLLECTION_NAME)
      .insertOne(validDataToAdd);
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
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'wifeId',
            foreignField: '_id',
            as: 'wife',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        {
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'exWifeId',
            foreignField: '_id',
            as: 'exWife',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        {
          $lookup: {
            from: MEMBER_COLLECTION_NAME,
            localField: 'childrenIds',
            foreignField: '_id',
            as: 'children',
            pipeline: [{ $project: { _destroy: 0 } }]
          }
        },
        { $project: { _destroy: 0, husbandId: 0, wifeId: 0, exWifeId: 0, childrenIds: 0 } }
      ])
      .toArray();
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
module.exports = Family;
