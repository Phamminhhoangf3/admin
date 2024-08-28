import account from '../models/accountModel.js';

const register = async request => {
  try {
    return await account.register(request);
  } catch (error) {
    throw error;
  }
};

const findAccount = async request => {
  try {
    return await account.findOne(request);
  } catch (error) {
    throw error;
  }
};

export const authService = { register, findAccount };
