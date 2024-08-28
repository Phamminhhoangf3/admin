const BASE_URL = "/admin";

export const paths = {
  root: BASE_URL,
  Login: BASE_URL + "/login",
  users: BASE_URL + "/user",
  addUser: BASE_URL + "/user/add",
  viewUser: BASE_URL + "/user/view",
  updateUser: BASE_URL + "/user/update",
} as const;
