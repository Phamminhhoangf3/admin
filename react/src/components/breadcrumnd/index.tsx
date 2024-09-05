import { Breadcrumb } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const AntdBreadcrumb = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const items = [
    {
      href: "/",
      title: t("home"),
    },
  ];

  const pathnames = location.pathname.split("/").filter((x) => x);
  pathnames.forEach((value, index) => {
    items.push({
      href: `/${pathnames.slice(0, index + 1).join("/")}`,
      title: t(value),
    });
  });

  return <Breadcrumb style={{ margin: "16px 0" }} items={items} />;
};

export default AntdBreadcrumb;
