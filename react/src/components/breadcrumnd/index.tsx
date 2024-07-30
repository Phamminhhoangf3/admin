import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const AntdBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { t } = useTranslation();

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link to="/">{t("home")}</Link>
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <Breadcrumb.Item key={to}>
            <Link to={to}>{t(value)}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default AntdBreadcrumb;
