import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

type FamilyType = {
  status: boolean;
  husbandId: string;
  wifeId: string;
  exWifeId: string;
  childrenIds?: string[];
};

const createFamily = async (requestParams: FamilyType) => {
  try {
    const response = await http.post(ENDPOINTS.addFamily, requestParams, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateFamily = async (id: string, requestParams: FamilyType) => {
  try {
    const response = await http.put(
      `${ENDPOINTS.updateFamily}/${id}`,
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

export default { createFamily, updateFamily };
