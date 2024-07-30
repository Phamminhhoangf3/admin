import { useRoutes } from "react-router-dom";
import Home from "~/pages/home";
import MainLayout from "~/components/layout/main-layout";
import Users from "~/pages/users";
import DetailUser from "~/pages/users/detail";
import { paths } from "~/constants/path";

export default function RouteElements() {
  const element = useRoutes([
    {
      path: paths.root.substring(1),
      element: <MainLayout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: paths.users.substring(1),
          children: [
            { path: "", element: <Users /> },
            {
              path: paths.addUser.split("/")[2],
              element: <DetailUser typePage="add" />,
            },
            {
              path: 'view/:id',
              element: <DetailUser typePage="detail" />,
            },
          ],
        },
      ],
    },
  ]);
  return element;
}
