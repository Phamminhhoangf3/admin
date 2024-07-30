import http from "~/common/http";
import { ROOT_URL } from "~/constants/common";

const _ROOT_URL = `${ROOT_URL}/`;

const apiUserService = {
  get: async (endpoint, params) => {
    const fullEndpoint = _ROOT_URL + endpoint;
    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((val) => urlParams.append(key, val));
      } else if (value) {
        urlParams.append(key, String(value));
      }
    }

    const response = await http.get(fullEndpoint, { params: urlParams });

    return response.data.data;
  },
};

export default apiUserService;
