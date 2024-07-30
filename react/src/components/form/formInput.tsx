import { Input, Typography } from "antd";
import { InputProps } from "antd/lib";

interface FormInputType extends InputProps {
  name: string;
  form: any;
  label: string;
}

const FormInput = ({ name, form, label, ...props }: FormInputType) => {
  const getChangeHandlerWithEvent = (name) => (event) =>
    form.setValue(name, event.target.value);

  return (
    <div>
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        {label}
      </Typography.Title>
      <Input
        onChange={getChangeHandlerWithEvent(name)}
        value={form.watch(name)}
        {...props}
      />
    </div>
  );
};

export default FormInput;
