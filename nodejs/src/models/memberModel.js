const { ObjectId } = require('mongodb');
const { GET_DB } = require('../config/mongodb');
const moment = require('moment');
const { GENDER_MEMBER } = require('../utils/constants');

const MEMBER_COLLECTION_NAME = 'members';

const findOneById = async id =>
  await GET_DB()
    .collection(MEMBER_COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });

const Member = function (member) {
  this.title = member.title;
  this.name = member.name;
  this.fromDob = member.fromDob;
  this.toDob = member.toDob;
  this.familyId = member.familyId;
  this.dad = member.dad;
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
        query.createdAt.$gte = moment.utc(filters.fromDate).startOf('day').toDate();
        break;
      case 'toDate':
        query.createdAt.$lte = moment.utc(filters.toDate).endOf('day').toDate();
        break;
      case 'fromDob':
        query.fromDob = {
          $gte: moment.utc(filters.fromDob).startOf('day').toDate(),
          $lte: moment.utc(filters.fromDob).endOf('day').toDate()
        };
        break;
      case 'toDob':
        query.toDob = {
          $gte: moment.utc(filters.toDob).startOf('day').toDate(),
          $lte: moment.utc(filters.toDob).endOf('day').toDate()
        };
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
    const result = findOneById(id);
    result(null, result);
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
