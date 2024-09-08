import { GENDER } from "~/common/enum";
import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

type CreateMemberType = {
  name: string;
  fromDob: string;
  toDob: string;
  image: string;
  status: boolean;
  familyId?: string;
  gender: GENDER;
};

type UpdateMemberType = CreateMemberType;

type FilterType = {
  keywords?: string;
  page: number;
  pageSize: number;
  [key: string]: any;
};

export const getMemberList = async (requestParams: FilterType) => {
  try {
    const response = await http.post(ENDPOINTS.members, requestParams, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

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

export const updateMember = async (
  idMember: string,
  requestParams: UpdateMemberType
) => {
  try {
    const response = await http.put(
      `${ENDPOINTS.updateMember}/${idMember}`,
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
