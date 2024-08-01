function generateSecretKey(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join(
    ""
  );
}

export const secretKey = generateSecretKey(32); // Tạo khóa bí mật 256-bit

export const ROOT_URL =
  import.meta.env.VITE_ROOT_URL || "http://localhost:8017";

export const ENDPOINTS = Object.freeze({
  user: `${ROOT_URL}/v1/users`,
  addUser: `${ROOT_URL}/v1/users/add`,
  deleteUser: `${ROOT_URL}/v1/users/delete`,
  updateUser: `${ROOT_URL}/v1/users/update`,
  detailUser: `${ROOT_URL}/v1/users/detail`,
  LOGOUT: "api/admin/auth/logout",
  TWO_FACTOR_AUTH: "api/auth/twofactorlogin",
});

export const PERMISSIONS = Object.freeze({
  CATEGORIES: "Categories",
});
