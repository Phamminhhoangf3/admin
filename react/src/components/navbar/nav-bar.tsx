import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { dataMenu } from "./dataMenu";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const NavbarNested: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuItem[] = dataMenu.map((item) => ({
    key: item.url,
    label: item.label,
    icon: item.icon,
  }));

  const onClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical w-2 h-2" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={onClick}
      />
    </Sider>
  );
};
export default NavbarNested;
