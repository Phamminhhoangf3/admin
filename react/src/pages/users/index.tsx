import { ColumnType } from "antd/es/table";
import PageCommonList from "~/components/PageCommonList";
import {
  getInitialFilters,
  KeyInitialFilters,
  PropsInitialFilters,
} from "~/config/initialFilter";
import { ENDPOINTS } from "~/constants/common";
import CommonDate from "~/utils/common-date";

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
        if (!!data?.keyword) dataNew.keyword = data.keyword.trim();
        if (data?.status !== undefined) dataNew.status = data.status === "true";
        return dataNew;
      }}
    />
  );
};

export default Users;
