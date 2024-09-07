/* eslint-disable no-console */
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators';
import Family from '../models/familyModel';
import { Member } from '../models/memberModel';

const FAMILY_COLLECTION_SCHEMA = Joi.object({
  type: Joi.string().trim().strict().default('family'),
  husbandId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  wifeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  exWifeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  childrenIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .required(),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(null),
  _destroy: Joi.boolean().default(false)
});

const validationBeforeCreate = async data => {
  return await FAMILY_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: 'Nội dung không được để trống!'
      });
    }
    const family = new Family({
      type: req.body.type,
      husbandId: req.body.husbandId,
      wifeId: req.body.wifeId,
      exWifeId: req.body.exWifeId,
      childrenIds: req.body.childrenIds
    });
    const familyValid = await validationBeforeCreate(family);
    if (!familyValid) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Dữ liệu không hợp lệ!'
      });
    }
    Family.create(familyValid, (error, data) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: error.message || 'Có lỗi xảy ra!'
        });
      }
      res.status(StatusCodes.CREATED).json(data);
    });
  } catch (error) {
    next(error);
  }
};

const getDetail = async (req, res, next) => {
  try {
    if (!req.params?.id) {
      res.status(400).send({
        message: 'Nội dung không được để trống!'
      });
    }
    Family.findOneById(req.params?.id, (error, data) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: error.message || 'Có lỗi xảy ra!'
        });
      } else {
        const dataMap = {
          ...data?.[0]
        };
        dataMap.husband = Member.convertToHusband(dataMap.husband[0]);
        dataMap.wife = Member.convertToWife(dataMap.wife[0]);
        dataMap.exWife = Member.convertToExWife(dataMap.exWife[0]);
        dataMap.children = Member.convertToChild(dataMap.children, dataMap.husband);
        res.status(StatusCodes.OK).json(dataMap);
      }
    });
  } catch (error) {
    next(error);
  }
};

const getList = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: 'Nội dung không được để trống!'
      });
    }
    Family.findAll(req.body, (error, data) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: error.message || 'Có lỗi xảy ra!'
        });
      }
      res.status(StatusCodes.OK).json(data);
    });
  } catch (error) {
    next(error);
  }
};

export default { createNew, getDetail, getList };
