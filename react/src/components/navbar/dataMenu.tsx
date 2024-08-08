import { paths } from "~/constants/path";
import { HomeOutlined } from "@ant-design/icons";

type dataMenuType = {
  label: string;
  icon: React.ReactNode;
  url: string;
};

export const dataMenu: dataMenuType[] = [
  {
    label: "Người dùng",
    icon: <HomeOutlined />,
    url: paths.users.substring(1),
  },
  // {
  //   label: "Người dùng",
  //   icon: <UserOutlined />,
  //   url: paths.users.substring(1),
  // },
];
