const { ObjectId } = require('mongodb');
const moment = require('moment');
const { GET_DB } = require('../config/mongodb');
const {
  MEMBER_COLLECTION_SCHEMA,
  MEMBER_UPDATE_SCHEMA,
  MEMBER_COLLECTION_NAME,
  MEMBER_UPDATE_MANY_SCHEMA
} = require('../schemas/memberSchema');

const validationBeforeCreate = async data => {
  return await MEMBER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const validationBeforeUpdate = async data => {
  return await MEMBER_UPDATE_SCHEMA.validateAsync(data, { abortEarly: false });
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
    const memberValid = await validationBeforeCreate(newMember);
    if (!memberValid) {
      throw new Error('Dữ liệu không hợp lệ!');
    }

    if (newMember.family) memberValid.family = new ObjectId(newMember.family);

    const memberInserted = await GET_DB().collection(MEMBER_COLLECTION_NAME).insertOne(memberValid);
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

Member.updateMany = async (ids, valueUpdate, result) => {
  try {
    const objectIds = ids.map(id => new ObjectId(id));
    const data = await GET_DB()
      .collection(MEMBER_COLLECTION_NAME)
      .updateMany(
        {
          _id: { $in: objectIds },
          _destroy: false
        },
        {
          $set: valueUpdate
        }
      );

    if (data.matchedCount === 0) {
      throw new Error('Không có thành viên trùng khớp!');
    } else {
      const membersUpdated = await GET_DB()
        .collection(MEMBER_COLLECTION_NAME)
        .find({
          _id: { $in: objectIds }
        })
        .toArray();
      result(null, membersUpdated);
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

module.exports = { Member, MEMBER_COLLECTION_NAME };
