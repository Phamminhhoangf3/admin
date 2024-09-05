const BASE_URL = "/admin";
const AUTH_URL = "/auth";

export const paths = {
  root: BASE_URL,
  // authentication
  rootAuth: AUTH_URL,
  Login: AUTH_URL + "/login",
  // home
  home: BASE_URL + "/home",
  // user
  users: BASE_URL + "/user",
  addUser: BASE_URL + "/user/add",
  viewUser: BASE_URL + "/user/view",
  updateUser: BASE_URL + "/user/update",
  // member
  members: BASE_URL + "/members",
  addMember: BASE_URL + "/members/add",
  viewMember: BASE_URL + "/members/view",
  updateMember: BASE_URL + "/members/update",
} as const;
