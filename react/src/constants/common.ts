function generateSecretKey(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join(
    ""
  );
}

export const secretKey = generateSecretKey(32);

export const ROOT_URL = import.meta.env.VITE_ROOT_URL;

export const ENDPOINTS = Object.freeze({
  // User
  user: `${ROOT_URL}/v1/users`,
  addUser: `${ROOT_URL}/v1/users/add`,
  deleteUser: `${ROOT_URL}/v1/users/delete`,
  updateUser: `${ROOT_URL}/v1/users/update`,
  detailUser: `${ROOT_URL}/v1/users/detail`,
  // Member
  members: `${ROOT_URL}/v1/admin/members`,
  addMember: `${ROOT_URL}/v1/admin/members/add`,
  deleteMember: `${ROOT_URL}/v1/admin/members/delete`,
  updateMember: `${ROOT_URL}/v1/admin/members/update`,
  detailMember: `${ROOT_URL}/v1/admin/members/detail`,
  // family
  family: `${ROOT_URL}/v1/admin/family`,
  addFamily: `${ROOT_URL}/v1/admin/family/add`,
  deleteFamily: `${ROOT_URL}/v1/admin/family/delete`,
  updateFamily: `${ROOT_URL}/v1/admin/family/update`,
  detailFamily: `${ROOT_URL}/v1/admin/family/detail`,
  // Auth
  login: `${ROOT_URL}/v1/auth/login`,
  logout: `${ROOT_URL}/v1/auth/logout`,
  checkAuth: `${ROOT_URL}/v1/auth/checkAuth`,
  TWO_FACTOR_AUTH: "api/auth/twofactorlogin",
});

export const PERMISSIONS = Object.freeze({
  CATEGORIES: "Categories",
});
