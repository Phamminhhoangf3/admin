import http from "~/common/http";
import { ENDPOINTS } from "~/constants/common";

export const checkAuth = async () => {
  try {
    const response = await http.get(ENDPOINTS.checkAuth, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
