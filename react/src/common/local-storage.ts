import Cookies from "js-cookie";
import crypto from "crypto-js";
import { secretKey } from "~/constants/common";

export const LocalStorageEventTarget = new EventTarget();

export const setIsAuthToLS = (token: string) =>
  localStorage.setItem("isAuth", token);

export const setInfoToLS = (data: any) => {
  const info = {
    permissions: data.permissions,
    userName: data.userName,
    roles: data.roles,
  };
  const cipherText = crypto.AES.encrypt(
    JSON.stringify(info),
    secretKey
  ).toString();

  localStorage.setItem("info", cipherText);
};

export const clearIsAuthLS = () => {
  localStorage.removeItem("info");
  Cookies.remove("token");

  const clearLSEvent = new Event("clearLS");
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getIsAuthFromLS = () => localStorage.getItem("isAuth") || "";
export const getInfoFromLS = () => {
  const result = localStorage.getItem("info");
  try {
    if (result) {
      const decryptedData = crypto.AES.decrypt(result, secretKey).toString(
        crypto.enc.Utf8
      );
      if (decryptedData) {
        return JSON.parse(decryptedData);
      } else {
        // Handle the case where the decrypted data is empty or not properly encoded.
        localStorage.removeItem("info");
        throw new Error("Malformed data in Local Storage");
      }
    }
  } catch (error) {
    // Handle decryption or parsing errors here.
    console.error("Error while retrieving data from Local Storage:", error);
  }
};
