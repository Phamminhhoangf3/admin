const Joi = require('joi');
const { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } = require('../../build/src/utils/validators');

export const FAMILY_COLLECTION_NAME = 'families';

export const FAMILY_COLLECTION_CREATE_SCHEMA = Joi.object({
  type: Joi.string().trim().strict().default('family'),
  husbandId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  wifeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  exWifeId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .default(null)
    .allow(null),
  childrenIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ),
  status: Joi.boolean().required().strict(),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(null),
  _destroy: Joi.boolean().default(false)
});

export const FAMILY_COLLECTION_UPDATE_SCHEMA = Joi.object({
  type: Joi.string().trim().strict().default('family'),
  husbandId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  wifeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  exWifeId: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE)
    .default(null)
    .allow(null),
  childrenIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ),
  status: Joi.boolean().required().strict(),
  updatedAt: Joi.date().default(new Date())
});
