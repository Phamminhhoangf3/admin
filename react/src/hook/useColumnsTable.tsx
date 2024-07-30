import { Button, Typography } from "antd";
import { ColumnType } from "antd/es/table";
import { APCLType } from "~/components/PageCommonList/pageCommonList.type";

const useColumnsTable = <T,>(
  columns: ColumnType<T>[],
  actions: APCLType | null
) => {
  const firstColumn = {
    title: "STT",
    dataIndex: "id",
    width: "80px",
    align: "center",
    render: (_, __, index) => <Typography.Text>{index + 1}</Typography.Text>,
  };

  const renderColumnAction = (id: string) => {
    if (!actions) return null;
    const { list } = actions;
    return (
      <div className="d-flex justify-content-center align-items-center">
        {!!list?.length &&
          list.map((item, index) => {
            let classIcon: any = null;
            let actionBtn: any = null;
            switch (item.name) {
              case "view":
                classIcon = "fa fa-eye";
                // actionBtn = () => router.push(item.url(id));
                break;
              case "edit":
                classIcon = "fa fa-pencil";
                // actionBtn = () => router.push(item.url(id));
                break;
              case "delete":
                classIcon = "fa fa-trash";
                actionBtn = () => {
                  if (!id) return;
                  // verifyDeleteItem({
                  //   name: item.getTitle(record),
                  //   refetchList: handleRefetch,
                  //   requestParams: { id },
                  //   url: item.url(id),
                  // });
                };
                break;
            }
            return (
              <Button
                key={index}
                icon={<i className={classIcon} />}
                onClick={actionBtn}
              />
            );
          })}
      </div>
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
      render: renderColumnAction,
    };
    lastColumns.push(columnAction);
  }

  return {
    data: [firstColumn, ...columns, ...lastColumns],
  };
};

export default useColumnsTable;
