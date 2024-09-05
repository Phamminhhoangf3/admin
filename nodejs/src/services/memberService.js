import { Member } from '../models/memberModel';

const getDetail = async (id, result) => {
  try {
    Member.findOneById(id, result);
  } catch (error) {
    throw error;
  }
};

export const memberService = { getDetail };
