import { Image } from "antd";
import { ColumnType } from "antd/es/table";
import { t } from "i18next";
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

export type MemberRecordType = {
  _id: string;
  title: string;
  name: string;
  fromDob: string;
  toDob: string;
  image: string;
  gender: string;
  active: string;
  createdAt: string;
  updatedAt: string;
};

const Members = () => {
  const columns: ColumnType<MemberRecordType>[] = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "fromDob",
      key: "fromDob",
      render: (text) => CommonDate.formatDate(text),
    },
    {
      title: "Ngày mất",
      dataIndex: "toDob",
      key: "toDob",
      render: (text) => CommonDate.formatDate(text),
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (text, record) => (
        <Image
          className="rounded-lg"
          preview={{
            maskClassName: "rounded-lg",
          }}
          width={100}
          src={text}
          alt={record?.name}
        />
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      align: "center",
      render: (text) => <>{t(text)}</>,
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
    "gender",
    "fromDob",
    "toDob",
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

  const actions = {
    fieldId: "_id",
    list: [
      {
        name: "view" as NameAction,
        url: (id: string) => `${paths.viewMember}/${id}`,
        roles: [],
      },
      {
        name: "edit" as NameAction,
        url: (id: string) => `${paths.updateMember}/${id}`,
        roles: [],
      },
      {
        name: "delete" as NameAction,
        url: (id: string) => `${ENDPOINTS.deleteMember}/${id}`,
        getTitle: (item: any) => item?.name,
        roles: [],
      },
    ],
  };

  const handleDataSubmit = (data) => {
    const dataNew = { ...data };
    Object.keys(dataNew).forEach((key) => {
      if (dataNew[key]) {
        switch (key) {
          case "keywords":
            dataNew.keywords = data.keywords.trim();
            break;
          case "status":
            dataNew.status = data.status === "true";
            break;
          case "createdDate":
            delete dataNew.createdDate;
            break;
        }
      } else {
        dataNew[key] = undefined;
      }
    });
    return dataNew;
  };

  return (
    <PageCommonList
      initialQuery={{
        endpoint: ENDPOINTS.members,
        add: paths.addMember,
      }}
      columnsTable={columns}
      initialFilters={getInitialFilters(filterNames, returnPropsFilter)}
      title="Thành viên gia đình"
      actions={actions}
      handleDataSubmit={handleDataSubmit}
    />
  );
};

export default Members;
