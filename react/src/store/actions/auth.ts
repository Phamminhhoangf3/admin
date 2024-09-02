import { paths } from "~/constants/path";
import { logout } from "~/services/apis/auth";

export const logoutAction = async (navigate) => {
  try {
    const res = await logout();
    if (res?.data?.statusCode === 200) {
      navigate(paths.Login);
    }
  } catch (error) {
    console.log(error);
  }
};
