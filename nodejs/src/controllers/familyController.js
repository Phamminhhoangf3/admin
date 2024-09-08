/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import Family from '../models/familyModel';
import familyService from '../services/familyService';

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
      childrenIds: req.body.childrenIds,
      status: req.body.status
    });
    Family.create(family, (error, data) => {
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
        res.status(StatusCodes.OK).json(data);
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

const updateItem = async (req, res, next) => {
  try {
    const values = req.body;
    const id = req.params.id;
    familyService.updateItem(id, values, (error, data) => {
      if (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          message: error.message || 'Có lỗi xảy ra!'
        });
      } else {
        res.status(StatusCodes.OK).json(data);
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    familyService.deleteItem(id, (error, data) => {
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

export default { createNew, getDetail, getList, updateItem, deleteItem };
