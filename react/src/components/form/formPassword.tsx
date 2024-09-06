import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Typography } from "antd";
import { InputProps } from "antd/lib";

interface FormInputType extends InputProps {
  name: string;
  form: any;
  label: string;
}

const FormPassword = ({ name, form, label, ...props }: FormInputType) => {
  const getChangeHandlerWithEvent = (name) => (event) =>
    form.setValue(name, event.target.value);

  return (
    <div>
      <Typography.Text>{label}</Typography.Text>
      <Input.Password
        {...props}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        onChange={getChangeHandlerWithEvent(name)}
        value={form.watch(name)}
        status={form.formState.errors?.[name] ? "error" : ""}
      />
    </div>
  );
};

export default FormPassword;
