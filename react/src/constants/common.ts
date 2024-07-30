function generateSecretKey(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => ("0" + byte.toString(16)).slice(-2)).join(
    ""
  );
}

export const secretKey = generateSecretKey(32); // Tạo khóa bí mật 256-bit

export const ENDPOINTS = Object.freeze({
  user: "users",
  addUser: "users/add",
  LOGOUT: "api/admin/auth/logout",
  TWO_FACTOR_AUTH: "api/auth/twofactorlogin",
});

export const ROOT_URL =
  import.meta.env.VITE_ROOT_URL || "http://localhost:8017";

export const PERMISSIONS = Object.freeze({
  CATEGORIES: "Categories",
});
