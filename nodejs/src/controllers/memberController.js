/* eslint-disable no-console */
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { GENDER_MEMBER } from '../utils/constants';
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators';
import { Member } from '../models/memberModel.js';
import { memberService } from '~/services/memberService';

const USER_COLLECTION_SCHEMA = Joi.object({
  gender: Joi.string().required().valid(GENDER_MEMBER.FEMALE, GENDER_MEMBER.MALE).trim().strict(),
  name: Joi.string().required().min(2).max(25).trim().strict(),
  image: Joi.string().required().trim().strict(),
  fromDob: Joi.date().required(),
  toDob: Joi.date().required(),
  status: Joi.boolean().required().strict(),
  familyId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(null),
  _destroy: Joi.boolean().default(false)
});

const validationBeforeCreate = async data => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false });
};

const createNew = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      res.status(400).send({
        message: 'Nội dung không được để trống!'
      });
    }
    const member = new Member({
      name: body.name,
      fromDob: body.fromDob,
      toDob: body.toDob,
      familyId: body.familyId,
      image: body.image,
      gender: body.gender,
      status: body.status
    });
    const memberValid = await validationBeforeCreate(member);
    if (!memberValid) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Dữ liệu không hợp lệ!'
      });
    }
    Member.create(memberValid, (error, data) => {
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

const getList = async (req, res, next) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: 'Nội dung không được để trống!'
      });
    }
    Member.findAll(req.body, (error, data) => {
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

const getDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    memberService.getDetail(id, (error, data) => {
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

const memberController = {
  getList,
  getDetail,
  createNew
};

export default memberController;
