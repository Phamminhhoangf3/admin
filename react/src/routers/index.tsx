import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Users from "~/pages/users";
import { paths } from "~/constants/path";
import Login from "~/pages/auth/login";
import MainLayout from "~/layout/main-layout";
import { useAuth } from "~/authProvider";
import AuthLayout from "~/layout/auth";
import DetailUser from "~/pages/users/detail";
import Members from "~/pages/members";
import DetailMember from "~/pages/members/detail";

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

const Root = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={paths.users} replace />;
  } else {
    return <Navigate to={paths.Login} replace />;
  }
};

export default function RouteElements() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/auth" element={<RejectedRoute />}>
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="/admin" element={<MainLayout />}>
        <Route path="user">
          <Route index element={<Users />} />
          <Route path="add" element={<DetailUser typePage="add" />} />
          <Route path="view/:id" element={<DetailUser typePage="detail" />} />
          <Route path="update/:id" element={<DetailUser typePage="update" />} />
        </Route>
        <Route path="members">
          <Route index element={<Members />} />
          <Route path="add" element={<DetailMember typePage="add" />} />
          <Route path="view/:id" element={<DetailMember typePage="detail" />} />
          <Route
            path="update/:id"
            element={<DetailMember typePage="update" />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
