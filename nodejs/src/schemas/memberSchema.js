const Joi = require('joi');
const { GENDER_MEMBER } = require('../../build/src/utils/constants');
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('../../build/src/utils/validators');

export const MEMBER_COLLECTION_NAME = 'members';

export const MEMBER_UPDATE_SCHEMA = Joi.object({
  gender: Joi.string().required().valid(GENDER_MEMBER.FEMALE, GENDER_MEMBER.MALE).trim().strict(),
  name: Joi.string().required().min(2).max(25).trim().strict(),
  image: Joi.string().required().trim().strict(),
  status: Joi.boolean().required().strict(),
  fromDob: Joi.string().required(),
  toDob: Joi.string().required(),
  familyId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null)
});

export const MEMBER_COLLECTION_SCHEMA = Joi.object({
  gender: Joi.string().required().valid(GENDER_MEMBER.FEMALE, GENDER_MEMBER.MALE).trim().strict(),
  name: Joi.string().required().min(2).max(25).trim().strict(),
  image: Joi.string().required().trim().strict(),
  fromDob: Joi.string().required(),
  toDob: Joi.string().required(),
  status: Joi.boolean().required().strict(),
  familyId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(null),
  _destroy: Joi.boolean().default(false)
});
