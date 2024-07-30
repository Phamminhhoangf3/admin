import { Breadcrumb, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import NavbarNested from "~/components/navbar/nav-bar";

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
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
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
