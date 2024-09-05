import { paths } from "~/constants/path";
import { HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

type dataMenuType = {
  label: string;
  icon: React.ReactNode;
  url: string;
};

export const dataMenu: dataMenuType[] = [
  {
    label: "Trang chủ",
    icon: <HomeOutlined />,
    url: paths.home,
  },
  {
    label: "Tài khoản",
    icon: <UserOutlined />,
    url: paths.users,
  },
  {
    label: "Thành viên",
    icon: <TeamOutlined />,
    url: paths.members,
  },
];
