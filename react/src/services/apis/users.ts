import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

type CreateUserType = {
  userName: string;
  level: number;
  active: boolean;
  password: string;
  repeatPassword: string;
};

type UpdateUserType = Omit<CreateUserType, "password" | "repeatPassword">;

export const createUser = async (requestParams: CreateUserType) => {
  try {
    const response = await http.post(ENDPOINTS.addUser, requestParams);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  idUser: string,
  requestParams: UpdateUserType
) => {
  try {
    const response = await http.put(
      `${ENDPOINTS.updateUser}/${idUser}`,
      requestParams
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await http.delete(`${ENDPOINTS.addUser}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
