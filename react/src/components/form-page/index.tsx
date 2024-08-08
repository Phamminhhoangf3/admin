import {
  ArrowLeftOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Flex, Row, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormListItemType } from "./formItem";
import { TypePage } from "~/types";
import LoadingContainer from "../loadingContainer";

type FormPageType = {
  detailsData?: any;
  type: TypePage;
  title: string;
  pathEdit?: string;
  pathBack: string;
  formListItem: FormListItemType[];
  onSubmit: (data) => void;
  loading?: boolean;
};

const FormPage = (props: FormPageType) => {
  const [reload, setReload] = useState(false);
  const {
    detailsData = null,
    type,
    title,
    pathBack,
    formListItem,
    onSubmit,
    loading,
  } = props;

  const navigate = useNavigate();
  const defaultvalues = formListItem.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  const form = useForm({
    mode: "onSubmit",
    defaultValues: defaultvalues,
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const handleReset = (e) => {
    e.preventDefault();
    reset();
    setReload(!reload);
  };

  useEffect(() => {
    if (!!detailsData && type !== "add") {
      formListItem.forEach((item) => {
        if (
          !!detailsData?.[item.name] ||
          typeof detailsData?.[item.name] === "boolean"
        ) {
          setValue(item.name as never, detailsData[item.name] as never);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsData, reload]);

  return (
    <Card
      className="w-full"
      title={
        <Typography
          className="cursor-pointer"
          onClick={() => {
            navigate(pathBack);
          }}
        >
          <ArrowLeftOutlined className="mr-2" />
          {title}
        </Typography>
      }
    >
      <LoadingContainer loading={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={16}>
            {formListItem?.map((item) => (
              <Col md={6} sm={6} xs={12} key={item.key}>
                {item.control({ form, type })}
                {errors?.[item?.name]?.message && (
                  <Typography.Text type="danger">
                    {errors?.[item?.name]?.message as string}
                  </Typography.Text>
                )}
              </Col>
            ))}
          </Row>
          {type !== "detail" && (
            <Flex justify="flex-end">
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                >
                  Lưu
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleReset}>
                  Đặt lại
                </Button>
              </Space>
            </Flex>
          )}
        </form>
      </LoadingContainer>
    </Card>
  );
};

export default FormPage;
