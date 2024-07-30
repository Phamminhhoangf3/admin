import { ColumnType } from "antd/es/table";
import PageCommonList from "~/components/PageCommonList";
import {
  getInitialFilters,
  KeyInitialFilters,
  PropsInitialFilters,
} from "~/config/initialFilter";
import { ENDPOINTS } from "~/constants/common";
import CommonDate from "~/utils/common-date";
import { tagActive } from "~/utils/tags";

type UserRecordType = {
  _id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

const Users = () => {
  const columns: ColumnType<UserRecordType>[] = [
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Cấp bậc",
      dataIndex: "level",
      key: "level",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (text: boolean) => tagActive(text),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (text: string) => CommonDate.formatDatetime(text),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedDate",
      key: "updatedDate",
      align: "center",
      render: (text: string) => CommonDate.formatDatetime(text),
    },
  ];

  const filterNames: KeyInitialFilters[] = [
    "keywords",
    "status",
    "createdDate",
  ];

  const returnPropsFilter = (name: KeyInitialFilters) => {
    const propsFilter: PropsInitialFilters = { name };
    switch (name) {
      case "keywords":
        propsFilter.placeholder = "Tên";
        break;
    }
    return propsFilter;
  };

  return (
    <PageCommonList
      initialQuery={{
        endpoint: ENDPOINTS.user,
        add: ENDPOINTS.addUser,
      }}
      columnsTable={columns}
      initialFilters={getInitialFilters(filterNames, returnPropsFilter)}
      title="Tài khoản quản trị"
      handleDataSubmit={(data) => {
        const dataNew = { ...data };
        if (!!data?.keywords) dataNew.keywords = data.keywords.trim();
        if (data?.status) dataNew.status = data.status === "true";
        return dataNew;
      }}
    />
  );
};

export default Users;
