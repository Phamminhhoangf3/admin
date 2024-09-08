import { REGEX_PASSWORD } from "~/constants/regex";
import FormInput from "../form/formInput";
import FormInputNumber from "../form/formInputNumber";
import FormPassword from "../form/formPassword";
import FormSwitch from "../form/formSwitch";
import FormDatePicker from "../form/formDatePicker";
import FormSelect from "../form/formSelect";
import { genderOptions } from "~/common/options-select";
import { getMemberList } from "~/services/apis/members";
import DebounceSelect from "../form/debounceSelect";
import { GENDER } from "~/common/enum";
import { Avatar, Space, Typography } from "antd";
import { MemberRecordType } from "~/pages/members";

const { Text } = Typography;

export type PropsItemType = {
  name?: string;
  options?: any[];
  categoryName?: string;
  initForm?: any;
  suffix?: string;
  disable?: boolean;
  handleValue?: (value: any) => void;
  asterisk?: boolean | undefined;
  handleChange?: (value: any, form: any) => void;
  handleClick?: (form: any) => void;
  disabled?: boolean;
};

export type FormListItemType = {
  key: string;
  name: string;
  col: number;
  value: any;
  control: (props: { form: any; type: string }) => JSX.Element;
};

type ValueType = (props: PropsItemType) => FormListItemType;

export type KeyFormItemType =
  | "username"
  | "level"
  | "status"
  | "password"
  | "repeatPassword"
  | "name"
  | "fromDob"
  | "toDob"
  | "gender"
  | "image"
  | "familyId"
  | "husbandId"
  | "wifeId"
  | "exWifeId"
  | "childrenIds";

export type FormItemsType = {
  [key in KeyFormItemType]?: ValueType;
};

export type ReturnPropsType = (name: KeyFormItemType) => PropsItemType;

export const getFormListItem = (listName, returnProps: ReturnPropsType) =>
  listName.map((name) => formItems?.[name]?.(returnProps(name)));

const formItems: FormItemsType = {
  username: ({ name = "username" }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => (
      <FormInput
        name={name}
        form={form}
        defaultValue=""
        label="Tên đăng nhập:"
        placeholder="Nhập tên đăng nhập"
        disabled={type === "detail"}
        allowClear
        {...form.register(name, {
          required: "Vui lòng nhập tên đăng nhập !",
        })}
      />
    ),
  }),
  image: ({ name = "image" }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => (
      <FormInput
        name={name}
        form={form}
        defaultValue=""
        label="Hình"
        placeholder="Nhập đường dẫn hình"
        disabled={type === "detail"}
        allowClear
        {...form.register(name, {
          required: "Vui lòng nhập đường dẫn hình!",
        })}
      />
    ),
  }),
  familyId: ({ name = "familyId" }) => ({
    key: name,
    name,
    col: 6,
    value: null,
    control: ({ form, type }) => (
      <FormSelect
        _name={name}
        disabled={type === "detail"}
        form={form}
        options={[]}
        label="Gia đình"
        allowClear
        placeholder="Chọn gia đình"
      />
    ),
  }),
  name: ({ name = "name", asterisk }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => (
      <FormInput
        name={name}
        form={form}
        defaultValue=""
        label="Họ và tên:"
        placeholder="Nhập họ và tên"
        disabled={type === "detail"}
        allowClear
        asterisk={asterisk}
        {...form.register(name, {
          required: "Vui lòng nhập họ và tên!",
        })}
      />
    ),
  }),
  fromDob: ({ name = "fromDob" }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => (
      <FormDatePicker
        disabled={type === "detail"}
        label="Ngày sinh"
        form={form}
        name={name}
        {...form.register(name, {
          required: "Vui lòng chọn ngày sinh!",
        })}
      />
    ),
  }),
  toDob: ({ name = "toDob" }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => (
      <FormDatePicker
        disabled={type === "detail"}
        label="Ngày mất"
        form={form}
        name={name}
        {...form.register(name, {
          required: "Vui lòng chọn ngày mất!",
        })}
      />
    ),
  }),
  gender: ({ name = "gender" }) => ({
    key: name,
    name,
    col: 6,
    value: null,
    control: ({ form, type }) => (
      <FormSelect
        _name={name}
        disabled={type === "detail"}
        form={form}
        options={genderOptions}
        label="Giới tính"
        allowClear
        placeholder="Chọn giới tính"
        {...form.register(name, {
          required: "Vui lòng chọn giới tính!",
        })}
      />
    ),
  }),
  level: ({ name = "level" }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => (
      <FormInputNumber
        name={name}
        form={form}
        defaultValue=""
        label="Cấp bậc:"
        placeholder="Nhập cấp bậc"
        disabled={type === "detail"}
        allowClear
        min={1}
        max={7}
        {...form.register(name, {
          required: "Vui lòng nhập cấp bậc !",
        })}
      />
    ),
  }),
  status: ({ name = "status" }) => ({
    key: name,
    name,
    col: 6,
    value: false,
    control: ({ form, type }) => (
      <FormSwitch
        name={name}
        form={form}
        label="Trạng thái:"
        disabled={type === "detail"}
        defaultValue
      />
    ),
  }),
  password: ({ name = "password" }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => {
      const required =
        type === "add" ? { required: "Vui lòng nhập xác nhận mật khẩu !" } : {};
      return (
        <FormPassword
          name={name}
          form={form}
          defaultValue=""
          label="Mật khẩu:"
          placeholder="Nhập mật khẩu"
          disabled={type !== "add"}
          allowClear
          {...form.register(name, {
            ...required,
            pattern: {
              value: REGEX_PASSWORD,
              message:
                "Mật khẩu phải chứa các ký tự là chữ thường, chữ hoa, và chữ số",
            },
          })}
        />
      );
    },
  }),
  repeatPassword: ({ name = "repeatPassword" }) => ({
    key: name,
    name,
    col: 6,
    value: "",
    control: ({ form, type }) => {
      const required =
        type === "add" ? { required: "Vui lòng nhập xác nhận mật khẩu !" } : {};
      return (
        <FormPassword
          name={name}
          form={form}
          defaultValue=""
          label="Xác nhận mật khẩu:"
          placeholder="Nhập xác nhận mật khẩu"
          disabled={type !== "add"}
          allowClear
          {...form.register(name, {
            ...required,
            pattern: {
              value: REGEX_PASSWORD,
              message:
                "Mật khẩu phải có chữ hoa, chữ thường, chữ số, ký tự đặc biệt và tối thiểu 8 ký tự !",
            },
          })}
        />
      );
    },
  }),
  husbandId: ({ name = "husbandId" }) => ({
    key: name,
    name: name,
    col: 6,
    value: null,
    control: ({ form: { setValue, watch } }) => (
      <DebounceSelect
        showSearch
        style={{ width: "100%" }}
        label="Chồng:"
        placeholder="Chọn chồng"
        value={watch(name)}
        fetchOptions={(filter) =>
          getMemberList({ ...filter, gender: GENDER.MALE })
        }
        onChange={(newValue) => {
          setValue(name, newValue?.value);
        }}
        handleResponse={(member: MemberRecordType) => ({
          label: member?.name,
          value: member?._id,
          image: member?.image,
        })}
        optionRender={(option: any) => (
          <Space>
            <Avatar src={option?.data?.image} />
            <Text>{option?.label}</Text>
          </Space>
        )}
      />
    ),
  }),
  wifeId: ({ name = "wifeId" }) => ({
    key: name,
    name: name,
    col: 6,
    value: null,
    control: ({ form: { setValue, watch } }) => (
      <DebounceSelect
        showSearch
        label="Vợ:"
        placeholder="Chọn vợ"
        style={{ width: "100%" }}
        value={watch(name)}
        fetchOptions={(filter) =>
          getMemberList({ ...filter, gender: GENDER.FEMALE })
        }
        onChange={(newValue) => {
          setValue(name, newValue?.value);
        }}
        handleResponse={(member: MemberRecordType) => ({
          label: `${member?.name}`,
          value: member?._id,
          image: member?.image,
        })}
        optionRender={(option: any) => (
          <Space>
            <Avatar src={option?.data?.image} />
            <Text>{option?.label}</Text>
          </Space>
        )}
      />
    ),
  }),
  exWifeId: ({ name = "exWifeId" }) => ({
    key: name,
    name: name,
    col: 6,
    value: null,
    control: ({ form: { setValue, watch } }) => (
      <DebounceSelect
        showSearch
        label="Vợ cũ:"
        placeholder="Chọn vợ cũ"
        style={{ width: "100%" }}
        value={watch(name)}
        fetchOptions={(filter) =>
          getMemberList({ ...filter, gender: GENDER.FEMALE })
        }
        onChange={(newValue) => {
          setValue(name, newValue?.value);
        }}
        handleResponse={(member: MemberRecordType) => ({
          label: `${member?.name}`,
          value: member?._id,
          image: member?.image,
        })}
        optionRender={(option: any) => (
          <Space>
            <Avatar src={option?.data?.image} />
            <Text>{option?.label}</Text>
          </Space>
        )}
      />
    ),
  }),
  childrenIds: ({ name = "childrenIds" }) => ({
    key: name,
    name: name,
    col: 12,
    value: null,
    control: ({ form: { setValue, watch } }) => (
      <DebounceSelect
        showSearch
        mode="multiple"
        label="Con:"
        placeholder="Chọn con"
        style={{ width: "100%" }}
        value={watch(name)}
        fetchOptions={getMemberList}
        onChange={(items) => {
          const values = items?.length ? items?.map((item) => item?.value) : [];
          setValue(name, values);
        }}
        handleResponse={(member: MemberRecordType) => ({
          label: `${member?.name}`,
          value: member?._id,
          image: member?.image,
        })}
        optionRender={(option: any) => (
          <Space>
            <Avatar src={option?.data?.image} />
            <Text>{option?.label}</Text>
          </Space>
        )}
      />
    ),
  }),
};

export default formItems;
