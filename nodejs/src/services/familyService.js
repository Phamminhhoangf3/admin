import Family from '../models/familyModel.js';

const getDetail = async (id, result) => {
  try {
    Family.findOneById(id, result);
  } catch (error) {
    throw error;
  }
};

const createNew = (reqBody, result) => {
  try {
    Family.createNew(reqBody, result);
  } catch (error) {
    throw error;
  }
};

const updateItem = async (id, values, result) => {
  try {
    await Family.update(id, values, result);
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (id, result) => {
  try {
    await Family.delete(id, result);
  } catch (error) {
    throw error;
  }
};

export default { getDetail, updateItem, deleteItem, createNew };
