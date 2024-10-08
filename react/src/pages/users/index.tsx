import { ColumnType } from "antd/es/table";
import PageCommonList from "~/components/PageCommonList";
import { NameAction } from "~/components/PageCommonList/pageCommonList.type";
import {
  getInitialFilters,
  KeyInitialFilters,
  PropsInitialFilters,
} from "~/config/initialFilter";
import { ENDPOINTS } from "~/constants/common";
import { paths } from "~/constants/path";
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
      dataIndex: "updatedAt",
      key: "updatedAt",
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

  const actionsUser = {
    fieldId: "_id",
    list: [
      {
        name: "view" as NameAction,
        url: (id: string) => `${paths.viewUser}/${id}`,
        roles: [],
      },
      {
        name: "edit" as NameAction,
        url: (id: string) => `${paths.updateUser}/${id}`,
        roles: [],
      },
      {
        name: "delete" as NameAction,
        url: (id: string) => `${ENDPOINTS.deleteUser}/${id}`,
        getTitle: (item: any) => item?.username,
        roles: [],
      },
    ],
  };

  return (
    <PageCommonList
      initialQuery={{
        endpoint: ENDPOINTS.user,
        add: paths.addUser,
      }}
      columnsTable={columns}
      initialFilters={getInitialFilters(filterNames, returnPropsFilter)}
      title="Tài khoản quản trị"
      actions={actionsUser}
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
