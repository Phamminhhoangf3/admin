import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

type CreateUserType = {
  username: string;
  level: number;
  active: boolean;
  password: string;
  repeatPassword: string;
};

type UpdateUserType = Omit<CreateUserType, "password" | "repeatPassword">;

export const createUser = async (requestParams: CreateUserType) => {
  try {
    const response = await http.post(ENDPOINTS.addUser, requestParams, {
      withCredentials: true,
    });
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
      requestParams,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await http.delete(`${ENDPOINTS.addUser}/${id}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
