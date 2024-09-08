import { Avatar, Flex, Space, Typography } from "antd";
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

type FamilyRecordType = {
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

const { Text } = Typography;

const Family = () => {
  const columns: ColumnType<FamilyRecordType>[] = [
    {
      title: "Gia đình",
      dataIndex: "husband",
      key: "husband",
      align: "center",
      width: "100px",
      render: (husband) => (
        <Flex justify="start">
          <Space>
            <Avatar src={husband?.image} alt={husband?.name} />
            <Text>{husband?.name}</Text>
          </Space>
        </Flex>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "60px",
      render: (text: boolean) => tagActive(text),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      width: "80px",
      render: (text: string) => CommonDate.formatDatetime(text),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      align: "center",
      width: "80px",
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
        propsFilter.placeholder = "Gia đình";
        break;
    }
    return propsFilter;
  };

  const actions = {
    fieldId: "_id",
    list: [
      {
        name: "view" as NameAction,
        url: (id: string) => `${paths.viewFamily}/${id}`,
        roles: [],
      },
      {
        name: "edit" as NameAction,
        url: (id: string) => `${paths.updateFamily}/${id}`,
        roles: [],
      },
      {
        name: "delete" as NameAction,
        url: (id: string) => `${ENDPOINTS.deleteFamily}/${id}`,
        getTitle: (item: any) => item?.husband?.name,
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
        endpoint: ENDPOINTS.family,
        add: paths.addFamily,
      }}
      columnsTable={columns}
      initialFilters={getInitialFilters(filterNames, returnPropsFilter)}
      title="Gia đình"
      actions={actions}
      handleDataSubmit={handleDataSubmit}
    />
  );
};

export default Family;
