import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/authProvider";
import AntdBreadcrumb from "~/components/breadcrumnd";
import HeaderLayout from "~/components/layout/header";
import NavbarNested from "~/components/navbar/nav-bar";
import { paths } from "~/constants/path";

const { Content, Footer } = Layout;

const MainLayout = ({ redirectPath = paths.Login }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <NavbarNested />
      <Layout>
        <HeaderLayout />
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
