import { useMutation } from "@tanstack/react-query";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "./constants/common";
import http from "./common/http";
import { paths } from "./constants/path";
import { checkAuth } from "./services/apis/auth";

const AuthContext = createContext({
  isAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginAction: (formValues: any) => {
    console.log(formValues);
  },
  logOut: () => {},
  loading: false,
});

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (form) => {
      const response = await http.post(ENDPOINTS.login, form, {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const loginAction = (formValues) => {
    setLoading(true);
    loginMutation.mutate(formValues, {
      onSuccess: () => {
        setLoading(false);
        setIsAuthenticated(true);
        navigate(paths.users);
      },
      onError: (error) => {
        setLoading(false);
        console.log({ error });
      },
    });
  };

  const logOut = () => {};

  useEffect(() => {
    const checkAndRedirect = async () => {
      const res = await checkAuth();
      setIsAuthenticated(Boolean(res?.status === 200));
    };
    checkAndRedirect();
  }, [setIsAuthenticated, navigate]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, loginAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
