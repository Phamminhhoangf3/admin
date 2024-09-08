import {
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Table } from "antd";
import { useForm } from "react-hook-form";
import { useFetchData } from "~/hook/useFetchData";
import { PageCommonListType } from "./pageCommonList.type";
import useColumnsTable from "~/hook/useColumnsTable";
import { useNavigate } from "react-router-dom";
import { verifyDelete } from "../popup-delete";

const PageCommonList = (props: PageCommonListType) => {
  const {
    initialQuery: { endpoint, add },
    initialFilters,
    title,
    handleDataSubmit = (data) => data,
    handleRequestDefault = (data) => data,
    columnsTable,
    actions = null,
  } = props;

  const navigate = useNavigate();
  const defaultValues = initialFilters.reduce((acc, curr) => {
    if (curr.value) acc[curr.name] = curr.value;
    return acc;
  }, {});

  const requestDefault = handleRequestDefault(defaultValues);

  const handleDelete = async (endpoint: string, name: string) => {
    verifyDelete({
      name,
      refetchList: () => updateParamsQuery({}),
      endpoint: endpoint,
    });
  };

  const { data: columns } = useColumnsTable(
    columnsTable,
    actions,
    handleDelete
  );

  const { data, updateParamsQuery, setRequest, loading } = useFetchData({
    endpoint,
    paramsQuery: requestDefault,
    method: "POST",
  });

  const form = useForm({
    defaultValues,
  });

  const { handleSubmit, reset } = form;

  const onSubmit = (data) => {
    const requestParamsNew = { ...data };
    updateParamsQuery(handleDataSubmit(requestParamsNew));
  };

  const handleReset = () => {
    reset();
    setRequest(requestDefault);
  };

  const handleData = (data) => {
    if (!data || !data?.length) return [];
    return data.map((item) => ({ ...item, key: item?._id }));
  };

  return (
    <Space direction="vertical" size="middle" className="flex">
      <Card
        title={title}
        className="w-full"
        extra={
          !!add && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                navigate(add);
              }}
              loading={loading}
            >
              Thêm
            </Button>
          )
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[10, 10]}>
            {initialFilters.map((item) => (
              <Col span={item.col} key={item.key}>
                {item.control(form)}
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: "right", marginTop: 12 }}>
            <Space size="small">
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                loading={loading}
              >
                Đặt lại
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
                loading={loading}
              >
                Tìm kiếm
              </Button>
            </Space>
          </div>
        </form>
      </Card>
      <Card>
        <Table
          key="_id"
          bordered
          columns={columns}
          dataSource={handleData(data)}
          loading={loading}
        />
      </Card>
    </Space>
  );
};

export default PageCommonList;
