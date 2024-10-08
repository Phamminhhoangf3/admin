import { userModel } from '../models/userModel.js';

const createNew = async reqBody => {
  try {
    const newUser = { ...reqBody };
    const createdUser = await userModel.createNew(newUser);
    const getNewUser = await userModel.findOneById(createdUser.insertedId);
    return getNewUser;
  } catch (error) {
    throw error;
  }
};

const getList = async filters => {
  try {
    const listUser = await userModel.getAll(filters);
    const formattedListUser = listUser.map(user => {
      const createdAt = user.createdAt ? new Date(user.createdAt).toISOString() : null;
      const updatedAt = user.updatedAt ? new Date(user.updatedAt).toISOString() : null;
      return {
        ...user,
        createdAt: createdAt,
        updatedAt: updatedAt
      };
    });
    return formattedListUser;
  } catch (error) {
    throw error;
  }
};

const getDetail = async id => {
  try {
    return await userModel.getDetail(id);
  } catch (error) {
    throw error;
  }
};

const getUser = async info => {
  try {
    return await userModel.getUser(info);
  } catch (error) {
    throw error;
  }
};

const deleteItem = async id => {
  try {
    return await userModel.deleteItem(id);
  } catch (error) {
    throw error;
  }
};

const updateItem = async (id, values) => {
  try {
    return await userModel.updateItem(id, values);
  } catch (error) {
    throw error;
  }
};

export const userService = { createNew, getList, deleteItem, getDetail, updateItem, getUser };
