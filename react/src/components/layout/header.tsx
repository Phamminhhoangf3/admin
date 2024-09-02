import { Dropdown, Layout, Modal, theme } from "antd";
import { useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { logoutAction } from "~/store/actions/auth";

const { Header } = Layout;
const HeaderLayout = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    Modal.confirm({
      title: "Bạn có chắc đăng xuất không ?",
      okText: "Có",
      cancelText: "Không",
      onOk: () => logoutAction(navigate),
    });
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  };

  const items: MenuProps["items"] = [
    {
      label: "Đăng xuất",
      key: "logout",
    },
  ];

  const menuProps = {
    items,
    onClick,
  };

  return (
    <Header
      className="flex justify-end px-12"
      style={{ background: colorBgContainer }}
    >
      <div className="w-28">
        <Dropdown menu={menuProps} placement="bottomRight">
          <div>admin</div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderLayout;
