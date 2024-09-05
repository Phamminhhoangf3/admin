import { GENDER } from "~/common/enum";
import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

type CreateMemberType = {
  name: string;
  fromDob: string;
  toDob: string;
  image: string;
  active: boolean;
  familyId?: string;
  gender: GENDER;
};

// type UpdateUserType = Omit<CreateUserType, "password" | "repeatPassword">;

export const createMember = async (requestParams: CreateMemberType) => {
  try {
    const response = await http.post(ENDPOINTS.addMember, requestParams, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// export const updateUser = async (
//   idUser: string,
//   requestParams: UpdateUserType
// ) => {
//   try {
//     const response = await http.put(
//       `${ENDPOINTS.updateUser}/${idUser}`,
//       requestParams,
//       {
//         withCredentials: true,
//       }
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteUser = async (id: string) => {
//   try {
//     const response = await http.delete(`${ENDPOINTS.addUser}/${id}`, {
//       withCredentials: true,
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
