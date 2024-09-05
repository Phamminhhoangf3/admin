import { REGEX_PASSWORD } from "~/constants/regex";
import FormInput from "../form/formInput";
import FormInputNumber from "../form/formInputNumber";
import FormPassword from "../form/formPassword";
import FormSwitch from "../form/formSwitch";

export type PropsItemType = {
  name?: string;
  options?: any[];
  categoryName?: string;
  initForm?: any;
  suffix?: string;
  disable?: boolean;
  handleValue?: (value: any) => void;
  asterisk?: boolean;
  handleChange?: (value: any, form: any) => void;
  handleClick?: (form: any) => void;
  disabled?: boolean;
};

export type FormListItemType = {
  key: string;
  name: string;
  asterisk: boolean;
  col: number;
  colSm: number;
  value: any;
  control: (props: { form: any; type: string }) => JSX.Element;
};

type ValueType = (props: PropsItemType) => FormListItemType;

export type KeyFormItemType =
  | "username"
  | "level"
  | "status"
  | "password"
  | "repeatPassword";

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
    asterisk: true,
    col: 12,
    colSm: 4,
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
  level: ({ name = "level" }) => ({
    key: name,
    name,
    asterisk: true,
    col: 12,
    colSm: 4,
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
  status: ({ name = "active" }) => ({
    key: name,
    name,
    asterisk: true,
    col: 12,
    colSm: 4,
    value: true,
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
    asterisk: true,
    col: 12,
    colSm: 4,
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
    asterisk: true,
    col: 12,
    colSm: 4,
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
};

export default formItems;
