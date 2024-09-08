import { message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPage from "~/components/form-page";
import {
  getFormListItem,
  KeyFormItemType,
  PropsItemType,
} from "~/components/form-page/formItem";
import { ENDPOINTS } from "~/constants/common";
import { paths } from "~/constants/path";
import { useFetchData } from "~/hook/useFetchData";
import { TypePage } from "~/types";
import serviceFamily from "~/services/apis/family";

type DetailFamilyType = {
  typePage: TypePage;
};

const DetailFamily = ({ typePage }: DetailFamilyType) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: dataDetails, loading } = useFetchData({
    endpoint: `${ENDPOINTS.detailFamily}/${id}`,
    disable: typePage === "add",
  });

  const listName: KeyFormItemType[] = [
    "husbandId",
    "wifeId",
    "exWifeId",
    "status",
    "childrenIds",
  ];

  const returnPropItem = () => {
    const props: PropsItemType = {};
    return props;
  };

  const handleSubmit = async (data) => {
    try {
      data.type = "family";
      setLoadingSubmit(true);
      let res;
      if (typePage === "add") res = await serviceFamily.createFamily(data);
      if (typePage === "update" && id) {
        const dataUpdate = { ...data };
        res = await serviceFamily.updateFamily(id, dataUpdate);
      }
      if (res?.status === 201 || res?.status === 200) {
        setLoadingSubmit(false);
        let message = "";
        if (typePage === "add") message = "Tạo gia đình thành công !";
        if (typePage === "update") message = "Cập nhật gia đình thành công !";
        messageApi.open({
          type: "success",
          content: message,
          onClose: () => navigate(paths.family),
        });
      }
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
      messageApi.open({
        type: "error",
        content: "Thao tác không thành công !",
      });
    }
  };

  return (
    <>
      <FormPage
        detailsData={dataDetails}
        loading={loading || loadingSubmit}
        title="Tài khoản quản trị"
        type={typePage}
        formListItem={getFormListItem(listName, returnPropItem)}
        onSubmit={handleSubmit}
        pathEdit={`${paths.updateFamily}?id=${id}`}
        pathBack={paths.family}
      />
      {contextHolder}
    </>
  );
};

export default DetailFamily;
