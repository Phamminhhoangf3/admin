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
import { createUser, updateUser } from "~/services/apis/users";
import { TypePage } from "~/types";

type DetailUserType = {
  typePage: TypePage;
};

const DetailUser = ({ typePage }: DetailUserType) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [state, setState] = useState({
    account: null,
    isLoading: false,
  });
  const { id } = useParams();

  const { isLoading } = state;
  const { data: dataDetails } = useFetchData({
    endpoint: `${ENDPOINTS.detailUser}/${id}`,
  });

  const listName = [
    "userName",
    "level",
    "password",
    "repeatPassword",
    "status",
  ];

  const returnPropItem = (name: KeyFormItemType) => {
    const props: PropsItemType = { name };
    switch (name) {
      case "status":
        props.name = "active";
        break;
    }
    return props;
  };

  const handleSubmit = async (data) => {
    try {
      let res;
      if (typePage === "add") res = await createUser(data);
      if (typePage === "update" && id) {
        const dataUpdate = { ...data };
        delete dataUpdate.password;
        delete dataUpdate.repeatPassword;
        res = await updateUser(id, dataUpdate);
      }
      if (res?.status === 201 || res?.status === 200) {
        let message = "";
        if (typePage === "add") message = "Tạo người dùng thành công !";
        if (typePage === "update") message = "Cập nhật người dùng thành công !";
        messageApi.open({
          type: "success",
          content: message,
          onClose: () => navigate(paths.users),
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thao tác không thành công !",
      });
      console.log(error);
    }
  };

  return (
    <>
      <FormPage
        detailsData={dataDetails}
        isLoading={isLoading}
        setData={setState}
        title="Tài khoản quản trị"
        type={typePage}
        formListItem={getFormListItem(listName, returnPropItem)}
        onSubmit={handleSubmit}
        pathEdit={`${paths.updateUser}/update?id=${id}`}
        pathBack={paths.users}
      />
      {contextHolder}
    </>
  );
};

export default DetailUser;
