import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Users from "~/pages/users";
import DetailUser from "~/pages/users/detail";
import { paths } from "~/constants/path";
import Login from "~/pages/auth/login";
import MainLayout from "~/layout/main-layout";
import { useAuth } from "~/authProvider";
import AuthLayout from "~/layout/auth";

const RejectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={paths.users} replace />;
  }
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

const Root = ({ redirectPath = paths.Login }) => {
  return <Navigate to={redirectPath} replace />;
};

export default function RouteElements() {
  const element = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: "/",
          element: <Root />,
        },
        {
          path: paths.Login,
          element: <Login />,
        },
      ],
    },
    {
      path: paths.users,
      element: <MainLayout />,
      children: [
        {
          path: "",
          children: [
            { path: "", element: <Users /> },
            {
              path: "add",
              element: <DetailUser typePage="add" />,
            },
            {
              path: "view/:id",
              element: <DetailUser typePage="detail" />,
            },
            {
              path: "update/:id",
              element: <DetailUser typePage="update" />,
            },
          ],
        },
      ],
    },
  ]);
  return element;
}
