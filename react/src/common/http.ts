import axios, {
  // AxiosError,
  type AxiosInstance,
} from "axios";
import Cookies from "js-cookie";
import {
  //  ENDPOINTS,
  ROOT_URL,
} from "~/constants/common";

// import { clearIsAuthLS, setInfoToLS } from "~/common/local-storage";

// function isAxiosError<T>(error: unknown): error is AxiosError<T> {
//   return axios.isAxiosError(error);
// }

// function isAxiosUnauthorizedError(error: unknown): error is AxiosError {
//   return isAxiosError(error) && error.response?.status === 401;
// }

// function isAxiosForbiddenError(error: unknown): error is AxiosError {
//   return isAxiosError(error) && error.response?.status === 403;
// }

// function isAxiosNotFoundError(error: unknown): error is AxiosError {
//   return isAxiosError(error) && error.response?.status === 404;
// }

// function isAxiosServerError(error: unknown): error is AxiosError {
//   return isAxiosError(error);
//   // && error.response?.status >= 500;
// }

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = Cookies.get("token");
    this.instance = axios.create({
      baseURL: `${ROOT_URL}`,
    });
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     if (this.accessToken && config.headers) {
    //       config.headers.Authorization = `Bearer ${this.accessToken}`;
    //       return config;
    //     }
    //     return config;
    //   },
    //   (error) => Promise.reject(error)
    // );

    // this.instance.interceptors.response.use(
    //   (response) => {
    //     const { url } = response.config;
    //     const data = response.data;

    //     /* if (url === ENDPOINTS.LOGIN) {
    //       Cookies.set('TwoFactorEmailRequired', data.data.userName)
    //     } */

    //     if (url === ENDPOINTS.TWO_FACTOR_AUTH) {
    //       this.accessToken = data.data.token;
    //       Cookies.set("token", data.data.token, {
    //         domain: window?.location?.hostname,
    //         path: "/admin",
    //       });
    //       setInfoToLS(data.data);
    //       Cookies.remove("TwoFactorEmailRequired");
    //     } else if (url === ENDPOINTS.LOGOUT) {
    //       this.accessToken = "";
    //       clearIsAuthLS();
    //     }
    //     return response;
    //   },
    //   (error: AxiosError) => {
    //     /* Todo */
    //     // Unauthorize (401) has many types.
    //     // - Wrong Token
    //     // - No Token
    //     // - Expired Token

    //     // If 401 Error
    //     /* Todo 401 */

    //     //Type: Wrong Token || No Token || Expired Token but Failed Request RefreshToken => ClearLS
    //     if (isAxiosUnauthorizedError(error)) {
    //       clearIsAuthLS();
    //       this.accessToken = "";
    //     }
    //     if (isAxiosForbiddenError(error)) {
    //       window.dispatchEvent(
    //         new CustomEvent("errorEvent", { detail: { status: 403 } })
    //       );
    //     }

    //     if (isAxiosNotFoundError(error)) {
    //       window.dispatchEvent(
    //         new CustomEvent("errorEvent", { detail: { status: 404 } })
    //       );
    //     }

    //     if (isAxiosServerError(error)) {
    //       window.dispatchEvent(
    //         new CustomEvent("errorEvent", { detail: { status: 500 } })
    //       );
    //     }

    //     return Promise.reject(error);
    //   }
    // );
  }
}

const http = new Http().instance;

export default http;
