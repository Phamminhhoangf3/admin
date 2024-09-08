import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { APCLType } from "~/components/PageCommonList/pageCommonList.type";

const useColumnsTable = <T,>(
  columns: ColumnType<T>[],
  actions: APCLType | null,
  handleDelete: (endpoint: string, title: string) => void
) => {
  const navigate = useNavigate();
  const firstColumn = {
    title: "STT",
    dataIndex: "id",
    width: "50px",
    align: "center",
    fixed: "left",
    render: (_, __, index) => <Typography.Text>{index + 1}</Typography.Text>,
  };

  const renderColumnAction = (id: string, record: any) => {
    if (!actions || !actions?.list?.length) return null;
    return (
      <Space>
        {actions.list.map((item, index) => {
          let icon: any = null;
          let actionBtn: any = null;
          const typeBtn = item.name === "edit" ? "primary" : "default";
          switch (item.name) {
            case "view":
              icon = <EyeOutlined />;
              actionBtn = () => navigate(item.url(id));
              break;
            case "edit":
              icon = <EditOutlined />;
              actionBtn = () => navigate(item.url(id));
              break;
            case "delete":
              icon = <DeleteOutlined />;
              actionBtn = () => {
                if (!id) return;
                handleDelete(
                  item.url(id),
                  item?.getTitle ? item?.getTitle(record) : ""
                );
              };
              break;
          }
          return (
            <Button
              type={typeBtn}
              key={index}
              icon={icon}
              onClick={actionBtn}
              danger={item.name === "delete"}
            />
          );
        })}
      </Space>
    );
  };

  const lastColumns: any = [];
  if (!!actions) {
    const { fieldId } = actions;
    const columnAction = {
      title: "Thao tác",
      key: fieldId,
      dataIndex: fieldId,
      align: "center",
      fixed: "right",
      width: 100,
      render: renderColumnAction,
    };
    lastColumns.push(columnAction);
  }

  return {
    data: [firstColumn, ...columns, ...lastColumns],
  };
};

export default useColumnsTable;
