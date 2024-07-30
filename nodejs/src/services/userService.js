import { userModel } from '~/models/userModel';

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

const deleteItem = async id => {
  try {
    return await userModel.deleteItem(id);
  } catch (error) {
    throw error;
  }
};

export const userService = { createNew, getList, deleteItem, getDetail };
