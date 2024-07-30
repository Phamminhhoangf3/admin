import { paths } from "~/constants/path";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

type dataMenuType = {
  label: string;
  icon: React.ReactNode;
  url: string;
};

export const dataMenu: dataMenuType[] = [
  {
    label: "Trang chủ",
    icon: <HomeOutlined />,
    url: paths.root,
  },
  {
    label: "Người dùng",
    icon: <UserOutlined />,
    url: paths.users,
  },
];
