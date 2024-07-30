import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import NavbarNested from "~/components/navbar/nav-bar";
import AntdBreadcrumb from "../breadcrumnd";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <NavbarNested />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <AntdBreadcrumb />
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Trang quản trị ©{new Date().getFullYear()} Created by Phạm Minh Hoàng
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
