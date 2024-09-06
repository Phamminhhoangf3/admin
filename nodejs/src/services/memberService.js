import { Member } from '../models/memberModel';

const getDetail = async (id, result) => {
  try {
    Member.findOneById(id, result);
  } catch (error) {
    throw error;
  }
};

const updateItem = async (id, values, result) => {
  try {
    await Member.update(id, values, result);
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (id, result) => {
  try {
    await Member.delete(id, result);
  } catch (error) {
    throw error;
  }
};

export const memberService = { getDetail, updateItem, deleteItem };
