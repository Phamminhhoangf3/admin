import { message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormPage from "~/components/form-page";
import {
  getFormListItem,
  PropsItemType,
} from "~/components/form-page/formItem";
import { ENDPOINTS } from "~/constants/common";
import { paths } from "~/constants/path";
import { useFetchData } from "~/hook/useFetchData";
import { createUser, updateUser } from "~/services/apis/users";
import { TypePage } from "~/types";

type DetailUserType = {
  typePage: TypePage;
};

const DetailUser = ({ typePage }: DetailUserType) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: dataDetails, loading } = useFetchData({
    endpoint: `${ENDPOINTS.detailUser}/${id}`,
    disable: typePage === "add",
  });

  const listName = ["username", "password", "repeatPassword", "status"];

  const returnPropItem = () => {
    const props: PropsItemType = {};
    return props;
  };

  const handleSubmit = async (data) => {
    try {
      setLoadingSubmit(true);
      let res;
      if (typePage === "add") res = await createUser(data);
      if (typePage === "update" && id) {
        const dataUpdate = { ...data };
        delete dataUpdate.password;
        delete dataUpdate.repeatPassword;
        res = await updateUser(id, dataUpdate);
      }
      if (res?.status === 201 || res?.status === 200) {
        setLoadingSubmit(false);
        let message = "";
        if (typePage === "add") message = "Tạo tài khoản thành công !";
        if (typePage === "update") message = "Cập nhật tài khoản thành công !";
        messageApi.open({
          type: "success",
          content: message,
          onClose: () => navigate(paths.users),
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
        pathEdit={`${paths.updateUser}?id=${id}`}
        pathBack={paths.users}
      />
      {contextHolder}
    </>
  );
};

export default DetailUser;
