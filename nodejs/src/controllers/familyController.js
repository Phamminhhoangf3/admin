/* eslint-disable no-console */
import { StatusCodes } from 'http-status-codes';
import Family from '../models/familyModel';
import familyService from '../services/familyService';
import { Member } from '../models/memberModel';

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
          message: error.message || 'Có lỗi xảy ra khi tạo gia đình!'
        });
      } else {
        const members = ['husbandId', 'wifeId', 'exWifeId'];

        const memberIds = members.map(member => {
          if (data?.[member]) {
            return data?.[member];
          }
        });

        const valueUpdate = { familyId: data._id, updatedAt: Date.now() };

        Member.updateMany(memberIds, valueUpdate, error => {
          if (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
              message: error.message || 'Có lỗi xảy ra cập nhật thành viên!'
            });
          } else {
            res.status(StatusCodes.CREATED).json(data);
          }
        });
      }
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

const getView = async (req, res, next) => {
  try {
    const id = req.params?.id;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: 'Nội dung không được để trống!'
      });
    }
    familyService.getView(id, (error, data) => {
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

export default { createNew, getDetail, getList, updateItem, deleteItem, getView };
