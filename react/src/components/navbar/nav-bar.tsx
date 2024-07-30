import { Menu } from "antd";
import { useState } from "react";
import { Layout } from "antd";
import { NavLink } from "react-router-dom";
import { dataMenu } from "./dataMenu";

const { Sider } = Layout;

const NavbarNested: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
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
        selectedKeys={[location.pathname.split("/")[1]]}
      >
        {dataMenu.map((item) => (
          <Menu.Item key={item.url}>
            <NavLink to={item.url}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
export default NavbarNested;
