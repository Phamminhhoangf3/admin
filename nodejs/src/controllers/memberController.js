import { StatusCodes } from 'http-status-codes';
import { Member } from '../models/memberModel.js';
import { memberService } from '../services/memberService';

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
    Member.create(member, (error, data) => {
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

const updateItem = async (req, res, next) => {
  try {
    const values = req.body;
    const id = req.params.id;
    memberService.updateItem(id, values, (error, data) => {
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

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    memberService.deleteItem(id, (error, data) => {
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
  createNew,
  updateItem,
  deleteItem
};

export default memberController;
