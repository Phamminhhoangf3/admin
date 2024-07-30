import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

type CreateUserType = {
  userName: string;
  level: number;
  active: boolean;
  password: string;
  repeatPassword: string;
};

export const createUser = async (requestParams: CreateUserType) => {
  try {
    const response = await http.post(ENDPOINTS.addUser, requestParams);
    return response;
  } catch (error) {
    console.log(error);
  }
};
