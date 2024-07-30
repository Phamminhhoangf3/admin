import { useRoutes } from "react-router-dom";
import Home from "~/pages/home";
import MainLayout from "~/components/layout/main-layout";
import Users from "~/pages/users";
import { ENDPOINTS } from "~/constants/common";
import DetailUser from "~/pages/users/add";

export default function RouteElements() {
  const element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: ENDPOINTS.user,
          children: [
            { path: "", element: <Users /> },
            { path: "add", element: <DetailUser /> },
          ],
        },
      ],
    },
  ]);
  return element;
}
