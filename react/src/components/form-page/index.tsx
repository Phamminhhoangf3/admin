import {
  ArrowLeftOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Space, Typography } from "antd";
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
        <Typography className="cursor-pointer">
          <ArrowLeftOutlined
            className="mr-2 hover:text-blue-600"
            onClick={() => {
              navigate(pathBack);
            }}
          />
          {title}
        </Typography>
      }
    >
      <LoadingContainer loading={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 10]}>
            {formListItem?.map((item) => (
              <Col span={item.col} key={item.key}>
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
            <div className="flex justify-end mt-5">
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
            </div>
          )}
        </form>
      </LoadingContainer>
    </Card>
  );
};

export default FormPage;
