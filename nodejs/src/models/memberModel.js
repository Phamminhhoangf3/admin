const { ObjectId } = require('mongodb');
const Joi = require('joi');
const moment = require('moment');
const { GET_DB } = require('../config/mongodb');
const { GENDER_MEMBER } = require('../utils/constants');
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('../../build/src/utils/validators');

const MEMBER_COLLECTION_NAME = 'members';
const UPDATE_UPDATE_SCHEMA = Joi.object({
  gender: Joi.string().required().valid(GENDER_MEMBER.FEMALE, GENDER_MEMBER.MALE).trim().strict(),
  name: Joi.string().required().min(2).max(25).trim().strict(),
  image: Joi.string().required().trim().strict(),
  status: Joi.boolean().required().strict(),
  fromDob: Joi.string().required(),
  toDob: Joi.string().required(),
  familyId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null)
});

const validationBeforeUpdate = async data => {
  return await UPDATE_UPDATE_SCHEMA.validateAsync(data, { abortEarly: false });
};

const findOneById = async id =>
  await GET_DB()
    .collection(MEMBER_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) }, { projection: { _destroy: 0 } });

const Member = function (member) {
  this.name = member.name;
  this.fromDob = member.fromDob;
  this.toDob = member.toDob;
  this.familyId = member.familyId;
  this.image = member.image;
  this.gender = member.gender;
  this.status = member.status;
};

Member.create = async (newMember, result) => {
  try {
    const validDataToAdd = { ...newMember };
    if (newMember.family) validDataToAdd.family = new ObjectId(newMember.family);
    const memberInserted = await GET_DB()
      .collection(MEMBER_COLLECTION_NAME)
      .insertOne(validDataToAdd);
    const memberCreated = await findOneById(memberInserted.insertedId);
    result(null, memberCreated);
  } catch (error) {
    result(error, null);
  }
};

Member.update = async (id, updateMember, result) => {
  try {
    const validData = await validationBeforeUpdate(updateMember);
    delete validData.createdAt;
    delete validData._id;
    validData.updatedAt = Date.now();
    const objectId = new ObjectId(id);
    const data = await GET_DB().collection(MEMBER_COLLECTION_NAME).updateOne(
      {
        _id: objectId,
        _destroy: false
      },
      {
        $set: validData
      }
    );
    if (data.matchedCount === 0) {
      throw new Error('No documents matches the provided id');
    } else {
      const memberUpdated = await findOneById(id);
      result(null, memberUpdated);
    }
  } catch (error) {
    result(error, null);
  }
};

Member.delete = async (id, result) => {
  try {
    const data = await GET_DB()
      .collection(MEMBER_COLLECTION_NAME)
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

const handleFilterToQuery = filters => {
  const query = {
    _destroy: false
  };
  Object.keys(filters).forEach(key => {
    switch (key) {
      case 'keywords':
        query.name = { $regex: filters.keywords, $options: 'i' };
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

Member.findAll = async (filters, result) => {
  try {
    const query = handleFilterToQuery(filters);
    const res = await GET_DB()
      .collection(MEMBER_COLLECTION_NAME)
      .find(query, {
        projection: { _destroy: 0 }
      })
      .toArray();
    result(null, res);
  } catch (error) {
    result(error, null);
  }
};

Member.findOneById = async (id, result) => {
  try {
    const data = await findOneById(id);
    result(null, data);
  } catch (error) {
    result(error, null);
  }
};

Member.convertToHusband = member => {
  if (!member) return null;
  return { ...member, tag: 'husband' };
};

Member.convertToWife = member => {
  if (!member) return null;
  return { ...member, tag: 'wife' };
};

Member.convertToExWife = member => {
  if (!member) return null;
  return { ...member, tag: 'ex-wife' };
};

Member.convertToChild = (members, dad) => {
  if (!members || !members?.length) return [];
  return members.map(member => {
    const newMember = { ...member };
    if (newMember.gender === GENDER_MEMBER.FEMALE) newMember.tag = 'daugther';
    if (newMember.gender === GENDER_MEMBER.MALE) newMember.tag = 'son';
    if (dad) newMember.dad = dad._id;
    return newMember;
  });
};

module.exports = { Member, MEMBER_COLLECTION_NAME };
